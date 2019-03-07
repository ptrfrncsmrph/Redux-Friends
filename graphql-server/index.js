const { GraphQLServer } = require("graphql-yoga")
const axios = require("axios")

const baseURL = `http://10.0.0.53:5000/api`

const prop = key => obj => obj[key]
const getData = prop("data")

const resolvers = {
  Query: {
    friends: () => axios.get(`${baseURL}/friends`).then(getData),
    friend: (_parent, { id }) =>
      axios.get(`${baseURL}/friends/${id}`).then(getData),
    posts: () => axios.get(`${baseURL}/posts`).then(getData),
    post: (_parent, { id }) => axios.get(`${baseURL}/posts/${id}`).then(getData)
  },
  Post: {
    author: ({ id }) => axios.get(`${baseURL}/posts/${id}/friend`).then(getData)
  },
  Friend: {
    posts: ({ id }) => axios.get(`${baseURL}/friends/${id}/posts`).then(getData)
  }
}

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
})

server.start(() => console.log(`GraphQL server is running on port 4000`)
