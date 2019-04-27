import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types'
import RecordService from '../services/user/RecordService'
import UserService from '../services/user/UserService'

// Add record
export const addRecord = (recordData, history) => async dispatch => {
  // dispatch(setContentLoading())
  try {
    const res = await RecordService.addRecord(recordData)
    dispatch(clearErrors())
    dispatch(getUserProfile(res.data.user))
    history.push('/user/profile')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Update user profile
export const getUserProfile = googleToken => async dispatch => {
  // dispatch(setContentLoading())
  try {
    const res = await UserService.getUserProfile({ googleToken })
    dispatch(setCurrentUser(res.data))
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
