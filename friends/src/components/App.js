import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"

import LoginForm from "./LoginForm"
// import "./App.css"

// const url = "http://localhost:5000/api/friends"

// const config = {
//   headers: {
//     authorization:
//       "eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ"
//   }
// }

// const loginUrl = "http://localhost:5000/api/login/"

// const loginBody = {
//   username: "Lambda School",
//   password: "i<3Lambd4"
// }

// const App = () => {
//   const [state, setState] = useState(null)
//   useEffect(() => {
//     axios.post(loginUrl, loginBody).then(setState)
//   }, [])
//   return (
//     <>
//       <pre>{JSON.stringify(state, null, 2)}</pre>
//     </>
//   )
// }

const App = () => <Route path="/login" component={LoginForm} />

export default App
