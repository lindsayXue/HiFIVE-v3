import { SET_CURRENT_ACTIVITY, GET_ERRORS } from './types'
import ActivityService from '../services/user/ActivityService'

// GET Activity
export const getActivity = () => async dispatch => {
  // dispatch(setContentLoading())
  try {
    const res = await ActivityService.getActivity()
    dispatch({
      type: SET_CURRENT_ACTIVITY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
