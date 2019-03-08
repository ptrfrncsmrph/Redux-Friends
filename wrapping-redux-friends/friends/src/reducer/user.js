import { Left, Right, Nothing, Just } from "../lib"
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions"

export default (state = Nothing, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Just.of(Right.of(action.payload))
    case LOGIN_FAILURE:
      return Just.of(Left.of(action.payload))
    case LOGOUT:
      return Nothing
    default:
      return state
  }
}
