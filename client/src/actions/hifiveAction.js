import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types'
import HiFIVEService from '../services/user/HiFIVEService'
import UserService from '../services/user/UserService'
import { getActivity } from './activityAction'
import { logoutUser } from './authAction'

// Add record
export const addHiFIVE = (hifiveData, history) => async dispatch => {
  // dispatch(setContentLoading())
  try {
    const resHiFIVE = await HiFIVEService.addHiFIVE(hifiveData)
    dispatch(clearErrors())
    const resUser = await UserService.getUserProfile({
      googleToken: resHiFIVE.data.sender
    })
    dispatch(setCurrentUser(resUser.data))
    history.push('/user/home')
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
