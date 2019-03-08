import reducer from "../reducer"
import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk))
)
