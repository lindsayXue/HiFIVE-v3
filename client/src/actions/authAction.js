import AuthService from '../services/user/AuthService'
import setAuthToken from '../services/setAuthToken'
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_ACTIVITY } from './types'
import { setCurrentUser } from './userAction'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await AuthService.register(userData)
    dispatch(setCurrentUser(res.data))
    dispatch(clearErrors())
    history.push('/user/home')
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(logoutUser())
      history.push('/')
      return
    }
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Log user in
export const loginUser = (googleToken, history) => async dispatch => {
  try {
    // Set token to Auth header
    setAuthToken(googleToken)
    const res = await AuthService.login()
    // Set token to ls
    localStorage.setItem('googleToken', googleToken)
    dispatch(setCurrentUser(res.data))
    history.push('/user/home')
  } catch (err) {
    if (err.response.status === 404) {
      localStorage.setItem('googleToken', googleToken)
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
  dispatch(clearErrors())
  setAuthToken()
  localStorage.removeItem('googleToken')
  dispatch({
    type: SET_CURRENT_ACTIVITY,
    payload: {}
  })
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
