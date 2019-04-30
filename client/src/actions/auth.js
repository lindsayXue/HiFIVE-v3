import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED
} from './types'
import setAuthToken from '../services/setAuthToken'
import AuthService from '../services/user/Auth'
import { setErrors } from './error'
import { clearActivity } from './activity'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await AuthService.getUserAuth()

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Login User
export const login = (token, history) => async dispatch => {
  try {
    setAuthToken(token)
    const res = await AuthService.login()
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    if (err.response.status === 404) {
      history.push('/register')
    }
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setErrors(error.msg)))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Register User
export const register = data => async dispatch => {
  try {
    const res = await AuthService.register(data)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setErrors(error.msg)))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Logout
export const logout = () => dispatch => {
  dispatch(clearActivity())
  dispatch({ type: LOGOUT })
}
