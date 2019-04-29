import { SET_CURRENT_ACTIVITY, ACTIVITY_LOADIND, GET_ERRORS } from './types'
import ActivityService from '../services/user/ActivityService'

// GET Activity
export const getActivity = () => async dispatch => {
  // dispatch(setContentLoading())
  try {
    dispatch(setActivityLoading())
    const res = await ActivityService.getActivity()
    dispatch(setActivity(res.data))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Set Activity
export const setActivity = activity => dispatch => {
  dispatch({
    type: SET_CURRENT_ACTIVITY,
    payload: activity
  })
}

// Set loading state
export const setActivityLoading = () => {
  return {
    type: ACTIVITY_LOADIND
  }
}
