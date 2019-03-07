import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

const url = "http://localhost:5000/api/friends"

const config = {
  headers: {
    authorization:
      "eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ"
  }
}

const loginUrl = "http://localhost:5000/api/login/"

const loginConfig = {
  // body: {
  username: "Lambda School",
  password: "i<3Lambd4"
  // }
}

const App = () => {
  const [state, setState] = useState(null)
  useEffect(() => {
    axios.post(loginUrl, loginConfig).then(setState)
  }, [])
  return (
    <div className="App">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default App
