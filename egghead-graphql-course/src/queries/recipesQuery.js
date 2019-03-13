import { gql } from "apollo-boost"

export default gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
      isStarred @client
    }
  }
`
