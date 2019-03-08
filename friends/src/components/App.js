import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"

import ProtectedRoute from "./ProtectedRoute"
import LoginForm from "./LoginForm"
import NavBar from "./NavBar"
import FriendsList from "./FriendsList"

const App = () => (
  <>
    <NavBar />
    <Route path="/login" component={LoginForm} />
    <ProtectedRoute path="/friends" component={FriendsList} />
  </>
)
export default App
