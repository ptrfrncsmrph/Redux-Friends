import React, { useState } from "react"
import { gql } from "apollo-boost"
import { Mutation } from "react-apollo"
import recipesQuery from "./queries/recipesQuery"

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`

const emptyRecipe = {
  title: "",
  vegetarian: false
}

const AddRecipe = () => {
  const [{ title, vegetarian }, setRecipe] = useState(emptyRecipe)
  const setTitle = ({ target: { value } }) =>
    setRecipe(r => ({ ...r, title: value }))
  const setVegetarian = ({ target: { checked } }) =>
    setRecipe(r => ({ ...r, vegetarian: checked }))
  const handleSubmit = fn => e => {
    e.preventDefault()
    fn({
      variables: {
        recipe: {
          title,
          vegetarian
        }
      }
    })
    setRecipe(emptyRecipe)
  }
  return (
    <Mutation
      mutation={addRecipeMutation}
      refetchQueries={[
        { query: recipesQuery, variables: { vegetarian: false } },
        { query: recipesQuery, variables: { vegetarian: true } }
      ]}
      awaitRefetchQueries={true}
    >
      {(addRecipe, { loading, error }) => (
        <>
          <h3>Add a recipe</h3>
          <form onSubmit={handleSubmit(addRecipe)}>
            <label>
              <input
                type="checkbox"
                checked={vegetarian}
                onChange={setVegetarian}
              />
              vegetarian
            </label>
            <label>
              title
              <input
                type="text"
                value={title}
                onChange={setTitle}
                defaultValue="Add a recipe"
              />
            </label>
            <button>Submit</button>
          </form>
          {loading && <div>Loading...</div>}
          {error && <div>Error! {JSON.stringify(error)}</div>}
        </>
      )}
    </Mutation>
  )
}

export default AddRecipe
