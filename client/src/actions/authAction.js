import AuthService from '../services/user/AuthService'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await AuthService.register(userData)
    dispatch(setCurrentUser(res.data))
    history.push('/user/home')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

// Log user in
export const loginUser = (googleToken, history) => async dispatch => {
  try {
    const res = await AuthService.login(googleToken)
    dispatch(setCurrentUser(res.data))
    history.push('/user/home')
  } catch (err) {
    if (err.response.status === 404) {
      history.push('/register')
      return
    }
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
