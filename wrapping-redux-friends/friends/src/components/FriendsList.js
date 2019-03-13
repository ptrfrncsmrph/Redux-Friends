import React from "react"
import { connect } from "react-redux"
import { maybe, either, id } from "../lib"
import { onDelete } from "../actions"

const onError = err => (
  <>
    <h1>Error</h1>
    <pre>{JSON.stringify(err, null, 2)}</pre>
  </>
)

const onLoading = <h3>Loading...</h3>

const FriendsList = ({ user, data, onDelete }) =>
  maybe(
    onLoading,
    either(onError, friends => (
      <ul>
        {friends.map(({ name, id }) => (
          <li key={id}>
            {name}
            <button onClick={() => onDelete(user)(id)}>x</button>
          </li>
        ))}
      </ul>
    ))
  )(data)

export default connect(
  ({ data }) => ({ data }),
  { onDelete }
)(FriendsList)
