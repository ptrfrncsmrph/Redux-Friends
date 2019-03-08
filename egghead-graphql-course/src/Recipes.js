import React, { useState } from "react"
import { gql } from "apollo-boost"
import { Query, Mutation } from "react-apollo"
import recipesQuery from "./queries/recipesQuery"

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`

const Recipes = () => {
  const [vegetarian, setVegetarian] = useState(true)
  const toggleVegetarian = ({ target: { checked } }) => setVegetarian(checked)
  return (
    <>
      <label>
        <input
          onChange={toggleVegetarian}
          type="checkbox"
          checked={vegetarian}
        />
        vegetarian
      </label>
      <Query query={recipesQuery} variables={{ vegetarian }}>
        {({ data, loading, error }) =>
          loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <h3>Error! {JSON.stringify(error, null, 2)}</h3>
          ) : (
            <ul>
              {data &&
                data.recipes.map(({ title, id, isStarred }) => (
                  <li>
                    {title}
                    <Mutation
                      mutation={updateRecipeStarredMutation}
                      refetchQueries={[
                        {
                          query: recipesQuery,
                          variables: { vegetarian: true }
                        },
                        {
                          query: recipesQuery,
                          variables: { vegetarian: false }
                        }
                      ]}
                      awaitRefetchQueries={true}
                    >
                      {(updateRecipeStarred, { loading, error }) => (
                        <button
                          onClick={() =>
                            updateRecipeStarred({
                              variables: {
                                id,
                                isStarred: !isStarred
                              }
                            })
                          }
                        >
                          {isStarred && "*"}
                        </button>
                      )}
                    </Mutation>
                  </li>
                ))}
            </ul>
          )
        }
      </Query>
    </>
  )
}

export default Recipes
