import { GET_ACTIVITY, ACTIVITY_ERROR, CLEAR_ACTIVITY } from './types'
import ActivityService from '../services/user/Activity'

// Get activity
export const getActivity = () => async dispatch => {
  try {
    const res = await ActivityService.getActivity()

    dispatch({
      type: GET_ACTIVITY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ACTIVITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.states }
    })
  }
}

// Clear activity
export const clearActivity = () => dispatch => {
  dispatch({ type: CLEAR_ACTIVITY })
}
