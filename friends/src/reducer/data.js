import { Left, Right, Nothing, Just } from "../lib"
import {
  DATA_FETCHING,
  DATA_FETCHED_SUCCESS,
  DATA_FETCHED_FAILURE
} from "../actions"

export default (state = Nothing, action) => {
  switch (action.type) {
    case DATA_FETCHING:
      return Nothing
    case DATA_FETCHED_SUCCESS:
      return Just.of(Right.of(action.payload))
    case DATA_FETCHED_FAILURE:
      return Just.of(Left.of(action.payload))
    default:
      return state
  }
}
