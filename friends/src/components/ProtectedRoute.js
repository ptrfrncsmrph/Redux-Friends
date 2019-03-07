import { Route } from "react-router-dom"

const ProtectedRoute = ({ component: Component, user, ...props }) => (
  <Route {...props} render={props => null} />
)
