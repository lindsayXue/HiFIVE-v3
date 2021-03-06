import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED
} from './types'
import AuthService from '../services/user/Auth'
import { setErrors } from './error'
import { clearActivity } from './activity'

// Load User
export const loadUser = () => async dispatch => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token)
  // }

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
// export const login = (googleToken, history) => async dispatch => {
//   setAuthToken(googleToken)
//   try {
//     const res = await AuthService.login()
//     setAuthToken(res.data.token)
//     dispatch({
//       type: LOGIN_SUCCESS
//     })
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     })
//   } catch (err) {
//     if (err.response.status === 404) {
//       dispatch({
//         type: LOGIN_SUCCESS
//       })
//       return history.push('/register')
//     }
//     const errors = err.response.data.errors
//     if (errors) {
//       dispatch(setErrors(errors))
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     })
//   }
// }

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
export const logout = () => async dispatch => {
  try {
    dispatch(clearActivity())
    dispatch({ type: LOGOUT })
    await AuthService.logout()
  } catch (err) {
    console.log(err)
  }
}
