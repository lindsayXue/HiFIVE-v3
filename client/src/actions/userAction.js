import { GET_ERRORS, SET_CURRENT_USER } from './types'
import UserService from '../services/user/UserService'
import { logoutUser } from './authAction'

// Get user profile
export const getUserProfile = () => async dispatch => {
  try {
    const res = await UserService.getUserProfile()
    dispatch(setCurrentUser(res.data))
  } catch (err) {
    if ((err.response.status = 401)) {
      dispatch(logoutUser())
    }
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Set current user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}
