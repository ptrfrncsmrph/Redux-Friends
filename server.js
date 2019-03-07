const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const uuidv4 = require("uuid/v4")
const data = require("./data")

const port = 5000
const app = express()
const token =
  "eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ"

app.use(bodyParser.json())

app.use(cors())

const { posts, users: friends } = data

const authenticator = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization === token) {
    next()
  } else {
    res.status(403).json({ error: "User be logged in to do that." })
  }
}

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

app.get("/api/friends", authenticator, (_req, res) => {
  setTimeout(() => {
    res.send(friends)
  }, 1000)
})

app.get("/api/posts", authenticator, (_req, res) => {
  setTimeout(() => {
    res.send(posts)
  }, 1000)
})

app.get("/api/friends/:id", authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id)

  if (friend) {
    res.status(200).json(friend)
  } else {
    res.status(404).send({ msg: "Friend not found" })
  }
})

app.post("/api/friends", authenticator, (req, res) => {
  const friend = { id: uuidv4(), ...req.body }

  friends = [...friends, friend]

  res.send(friends)
})

app.put("/api/friends/:id", authenticator, (req, res) => {
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

app.delete("/api/friends/:id", authenticator, (req, res) => {
  const { id } = req.params

  friends = friends.filter(f => f.id !== id)

  res.send(friends)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
