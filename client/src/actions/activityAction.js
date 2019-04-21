import { SET_CURRENT_ACTIVITY } from './types'
import ActivityService from '../services/user/ActivityService'

// GET Activity
export const getActivity = () => async dispatch => {
  // dispatch(setContentLoading())
  const res = await ActivityService.index()
  dispatch({
    type: SET_CURRENT_ACTIVITY,
    payload: res.data
  })
}