import AuthService from '../services/user/AuthService'
import setAuthToken from '../services/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await AuthService.register(userData)
    dispatch(setCurrentUser(res.data))
    dispatch(clearErrors())
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
    console.log('1')
    // Set token to Auth header
    setAuthToken(googleToken)
    const res = await AuthService.login()
    console.log('2')
    // Set token to ls
    localStorage.setItem('googleToken', googleToken)
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
