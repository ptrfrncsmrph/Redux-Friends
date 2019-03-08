import Axios from "axios"

export const LOGGING_IN = "LOGGING_IN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"

export const DATA_FETCHING = "DATA_FETCHING"
export const DATA_FETCHED_SUCCESS = "DATA_FETCHED_SUCCESS"
export const DATA_FETCHED_FAILURE = "DATA_FETCHED_FAILURE"

const baseURL = "http://10.0.0.53:5000/api"

const login = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

const loginFail = err => ({
  type: LOGIN_FAILURE,
  payload: err
})

export const fetchFriends = token => dispatch =>
  Axios.get(`${baseURL}/friends/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  })
    .then(({ data }) =>
      dispatch({
        type: DATA_FETCHED_SUCCESS,
        payload: data
      })
    )
    .catch(err => dispatch({ type: DATA_FETCHED_FAILURE, payload: err }))

export const onLoginSubmit = credentials => dispatch =>
  Axios.post(`${baseURL}/login/`, credentials)
    .then(({ data: { payload } }) => {
      dispatch(login(payload))
      fetchFriends(payload)(dispatch)
    })
    .catch(err => dispatch(loginFail(err)))

export const onDelete = token => dispatch => id =>
  Axios.delete(`${baseURL}/friends/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  })
    .then(({ data }) =>
      dispatch({
        type: DATA_FETCHED_SUCCESS,
        payload: data
      })
    )
    .catch(console.error)
