import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => (
  <nav>
    <NavLink to="/" exact>
      Home
    </NavLink>
    <NavLink to="/friends" exact>
      Friends list
    </NavLink>
  </nav>
)

export default NavBar
