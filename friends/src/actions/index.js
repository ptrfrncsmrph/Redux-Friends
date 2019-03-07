import Axios from "axios"

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

export const onLoginSubmit = credentials => dispatch => {
  console.log("Calling axios.post with credentials:", credentials)
  Axios.post(`${baseURL}/login/`, credentials)
    .then(({ data: { payload } }) => dispatch(login(payload)))
    .catch(err => dispatch(loginFail(err)))
}
