import { SET_CURRENT_ACTIVITY } from './types'
import axios from 'axios'

// GET Activity
export const getActivity = () => async dispatch => {
  // dispatch(setContentLoading())
  try {
    const res = await axios.get('/activity')
    dispatch({
      type: SET_CURRENT_ACTIVITY,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
