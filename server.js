const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const uuidv4 = require("uuid/v4")
const jwt = require("jsonwebtoken")
const data = require("./data")

const port = 5000
const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use((req, res, next) => {
  const { authorization } = req.headers
  const { url } = req
  jwt.verify(authorization, "shhhhh", (err, decodedToken) => {
    if (url === "/api/login/") {
      next()
    } else if (err || !decodedToken) {
      res.status(401).send("not authorized")
      return
    }
    next()
  })
})

const { posts, users: friends } = data

/// Making a token
const token = jwt.sign({ foo: "bar" }, "shhhhh")

app.post("/api/login", (req, res) => {
  const { username, password } = req.body
  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true
    res.status(200).json({
      payload: token
    })
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" })
  }
})

// users
app.get("/api/friends", (_req, res) => {
  setTimeout(() => {
    res.send(friends)
  }, 1000)
})

// posts
app.get("/api/posts", (_req, res) => {
  setTimeout(() => {
    res.send(posts)
  }, 1000)
})

// usersById
app.get("/api/friends/:id", (req, res) => {
  const friend = friends.find(f => f.id == req.params.id)

  if (friend) {
    res.status(200).json(friend)
  } else {
    res.status(404).send({ msg: "Friend not found" })
  }
})

// postsForUser
app.get("/api/friends/:id/posts", (req, res) => {
  const ps = posts.filter(post => post.user === req.params.id)
  if (ps.length > 0) {
    res.status(200).json(ps)
  } else {
    res.status(404).send({ msg: "Friend not found" })
  }
})

// postById
app.get("/api/posts/:id", (req, res) => {
  const ix = posts.findIndex(p => p.id === req.params.id)
  ix >= 0
    ? res.status(200).json(posts[ix])
    : res.status(400).send({ msg: "Post not found" })
})

// authorForPost
app.get("/api/posts/:id/friend", (req, res) => {
  const authorForPost = friends.find(f => f.postIds.includes(req.params.id))
  authorForPost
    ? res.status(200).json(authorForPost)
    : res.status(400).send({ msg: "Author not found" })
})

// POST

app.post("/api/friends", (req, res) => {
  const friend = { id: uuidv4(), ...req.body }

  friends = [...friends, friend]

  res.send(friends)
})

// PUT

app.put("/api/friends/:id", (req, res) => {
  const { id } = req.params

  const friendIndex = friends.findIndex(f => f.id == id)

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body }

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ]
    res.send(friends)
  } else {
    res.status(404).send({ msg: "Friend not found" })
  }
})

// DELETE

app.delete("/api/friends/:id", (req, res) => {
  const { id } = req.params

  friends = friends.filter(f => f.id !== id)

  res.send(friends)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
