const uuidv4 = require("uuid/v4")
const { posts } = require("./posts.json")

const friends = [
  {
    id: 1,
    name: "Ben",
    age: 30,
    email: "ben@lambdaschool.com"
  },
  {
    id: 2,
    name: "Austen",
    age: 45,
    email: "austen@lambdaschool.com"
  },
  {
    id: 3,
    name: "Ryan",
    age: 15,
    email: "ryan@lambdaschool.com"
  },
  {
    id: 4,
    name: "Dustin",
    age: 25,
    email: "D-munny@lambdaschool.com"
  },
  {
    id: 5,
    name: "Sean",
    age: 35,
    email: "sean@lambdaschool.com"
  },
  {
    id: 6,
    name: "Michelle",
    age: 67,
    email: "michelle@gmail.com"
  }
]

// I think this will always be less than m...
const randomInRange = (m, n) => Math.floor(Math.random() * (n - m)) + m

// ...so this should be safe
const randomInArray = xs => xs[randomInRange(0, xs.length)]

const genTimestamp = years => {
  const now = Date.now()
  const then = now - 1000 * 60 * 60 * 24 * 365 * years
  return randomInRange(then, now)
}

const genSeedJSON = () => {
  // Overwrite ID to be uuidv4 format
  const users = friends.map(f => ({ ...f, id: uuidv4() }))
  // Grab a bag of ids
  const $ids = users.map(({ id }) => id)
  // Add a random timestamp to each post, and assign a subselection to a user (friend)
  const $posts = JSON.parse(posts)
    .map(post => ({
      post,
      user: randomInArray($ids),
      timestamp: genTimestamp(5)
    }))
    .reduce(
      (postsByUser, { post, user, timestamp }) => ({
        ...postsByUser,
        [user]: [...(postsByUser[user] || []), { post, timestamp }]
      }),
      {}
    )
  return {
    posts: $posts,
    users
  }
}

module.exports = genSeedJSON()
