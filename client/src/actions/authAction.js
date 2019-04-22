import AuthService from '../services/user/AuthService'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    const user = await AuthService.register(userData)
    dispatch(setCurrentUser(user))
    history.push('/home')
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

// Login User
export const loginUser = (googleId, history) => async dispatch => {
  try {
    const user = await AuthService.login({
      googleId
    })
    dispatch(setCurrentUser(user.data))
    history.push('/user/home')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
