export default _store => next => action => {
  action.type === LOGIN_SUCCESS &&
    localStorage.setItem("userToken", action.payload.token)
  next(action)
}
