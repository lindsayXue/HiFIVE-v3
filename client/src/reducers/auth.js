import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT
} from '../actions/types'

const initialState = {
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
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    }
    // case LOGIN_SUCCESS: // Just Login but no Register
    //   return {
    //     ...state,
    //     loading: false
    //   }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}
