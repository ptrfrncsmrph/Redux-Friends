import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { maybe, either, id } from "../lib"

const onError = err => (
  <>
    <h1>Error</h1>
    <pre>{JSON.stringify(err, null, 2)}</pre>
  </>
)

const ProtectedRoute = ({ component: Component, user, data, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        maybe(
          <Redirect to="/login" />,
          either(onError, validUser => (
            <Component {...props} user={validUser} />
          ))
        )(user)
      }
    />
  )
}

export default connect(id)(ProtectedRoute)
