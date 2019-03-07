import { combineReducers } from "redux"
import user from "./user"
import data from "./data"

export default combineReducers({
  user
})

// user :: Maybe User
// data :: Either Error Friends

// export default (state, action) => {
//   switch (action.type) {
//     default:
//       return state
//   }
// }
