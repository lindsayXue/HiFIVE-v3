import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGOUT
} from './types'
import setAuthToken from '../services/setAuthToken'
import AuthService from '../services/admin/Auth'
import { setErrors } from './error'

export const loadAdmin = () => async dispatch => {
  if (localStorage.adminToken) {
    setAuthToken(localStorage.adminToken)
  }
  try {
    const res = await AuthService.getUserAuth()
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data.token
    })
  } catch (err) {
    dispatch({
      type: ADMIN_AUTH_ERROR
    })
  }
}

export const adminLogin = (data, history) => async dispatch => {
  try {
    const res = await AuthService.login(data)

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data.token
    })
    history.push('/admin/activity')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
    dispatch({
      type: ADMIN_LOGIN_FAIL
    })
  }
}

export const adminLogout = () => dispatch => {
  dispatch({ type: ADMIN_LOGOUT })
}
