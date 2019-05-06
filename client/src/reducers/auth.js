import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT
} from '../actions/types'

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    }
    case LOGIN_SUCCESS: // Just Login but no Register
      return {
        ...state,
        loading: false
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}
