import { GET_ERRORS, CLEAR_ERRORS } from './types'
import RecordService from '../services/user/RecordService'
import { getUserProfile } from './userAction'
import { logoutUser } from './authAction'

// Add record
export const addRecord = (recordData, history) => async dispatch => {
  // dispatch(setContentLoading())
  try {
    await RecordService.addRecord(recordData)
    dispatch(clearErrors())
    dispatch(getUserProfile())
    history.push('/user/profile')
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(logoutUser())
      return
    }
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
