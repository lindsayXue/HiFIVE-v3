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
      payload: token
    })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      })
      return history.push('/register')
    }
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Register User
export const register = (newUser, history) => async dispatch => {
  try {
    const res = await AuthService.register(newUser)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    history.push('/user/home')
  } catch (err) {
    if (err.response.status === 401) {
      history.push('/')
    }
    const errors = err.response.data.errors

    if (errors) {
      dispatch(setErrors(errors))
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
