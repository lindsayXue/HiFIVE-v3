import { GET_ERRORS, CLEAR_ERRORS } from './types'
import RecordService from '../services/user/RecordService'

// Add record
export const addRecord = (recordData, history) => async dispatch => {
  // dispatch(setContentLoading())
  try {
    await RecordService.addRecord(recordData)
    dispatch(clearErrors())
    history.push('/user/profile')
  } catch (err) {
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
