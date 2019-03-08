import React from "react"
import { connect } from "react-redux"
import { maybe, either, id } from "../lib"

const onError = err => (
  <>
    <h1>Error</h1>
    <pre>{JSON.stringify(err, null, 2)}</pre>
  </>
)

const onLoading = <h3>Loading...</h3>

const FriendsList = ({ data }) =>
  maybe(
    onLoading,
    either(onError, friends => (
      <ul>
        {friends.map(f => (
          <li>{JSON.stringify(f)}</li>
        ))}
      </ul>
    ))
  )(data)

export default connect(id)(FriendsList)
