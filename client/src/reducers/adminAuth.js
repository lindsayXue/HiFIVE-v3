import {
  ADMIN_LOADED,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGOUT
} from '../actions/types'

const initialState = {
  adminToken: localStorage.getItem('adminToken'),
  isAdmin: false,
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        adminToken: localStorage.getItem('adminToken'),
        isAdmin: true,
        loading: false
      }
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('adminToken', payload)
      return {
        ...state,
        adminToken: localStorage.getItem('adminToken'),
        isAdmin: true,
        loading: false
      }
    case ADMIN_LOGIN_FAIL:
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGOUT:
      localStorage.removeItem('adminToken')
      return {
        ...state,
        adminToken: null,
        isAdmin: false,
        loading: false
      }
    default:
      return state
  }
}
