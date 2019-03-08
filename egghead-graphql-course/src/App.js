import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import Recipes from "./Recipes"
import AddRecipe from "./AddRecipe"

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || []
      return starredRecipes.includes(parent.id)
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || []
      variables.isStarred
        ? localStorage.setItem(
            "starredRecipes",
            JSON.stringify(starredRecipes.concat([variables.id]))
          )
        : localStorage.setItem(
            "starredRecipes",
            JSON.stringify(
              starredRecipes.filter(recipeId => recipeId !== variables.id)
            )
          )
      return {
        __typename: "Recipe",
        isStarred: variables.isStarred
      }
    }
  }
}

const client = new ApolloClient({
  uri: "http://10.0.0.53:4000/",
  clientState: { resolvers }
})

const App = () => (
  <ApolloProvider client={client}>
    <main>
      <header>
        <h1>Hello</h1>
        <AddRecipe />
        <Recipes />
      </header>
    </main>
  </ApolloProvider>
)

export default App
