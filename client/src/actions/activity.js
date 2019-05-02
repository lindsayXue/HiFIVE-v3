import {
  GET_ACTIVITY,
  ACTIVITY_ERROR,
  CLEAR_ACTIVITY,
  CLEAR_ACTIVITY_ERROR
} from './types'
import UserActivityService from '../services/user/Activity'
import AdminActivityService from '../services/admin/Activity'

// Get activity
export const getActivity = () => async dispatch => {
  try {
    const res = await UserActivityService.getActivity()

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    dispatch({
      type: ACTIVITY_ERROR,
      payload: errors
    })
  }
}

// Add activity
export const addActivity = data => async dispatch => {
  try {
    const res = await AdminActivityService.addActivity(data)

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    dispatch({
      type: ACTIVITY_ERROR,
      payload: errors
    })
  }
}

// Clear activity error
export const clearActivityError = errorName => dispatch => {
  dispatch({
    type: CLEAR_ACTIVITY_ERROR,
    payload: errorName
  })
}

// Clear activity
export const clearActivity = () => dispatch => {
  dispatch({ type: CLEAR_ACTIVITY })
}
