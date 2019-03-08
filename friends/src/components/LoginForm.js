import React, { useState } from "react"
import { connect } from "react-redux"
import { onLoginSubmit } from "../actions"

const emptyForm = {
  username: "",
  password: ""
}

const LoginForm = ({ onLoginSubmit, history }) => {
  const [{ username, password }, setState] = useState(emptyForm)
  const handleChange = ({ target: { name, value } }) => {
    setState(state => ({ ...state, [name]: value }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    onLoginSubmit({ username, password })
    history.push("/friends")
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter username..."
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password..."
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}

export default connect(
  null,
  {
    onLoginSubmit
  }
)(LoginForm)
