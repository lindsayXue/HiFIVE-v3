import {
  SET_ADMIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_ACTIVITY
} from './types'
import AuthService from '../services/admin/AuthService'
import setAuthToken from '../services/setAuthToken'
import ActivityService from '../services/admin/ActivityService'
import BonusService from '../services/admin/BonusService'
import {
  setActivity,
  setActivityLoading,
  setActivityUnloading
} from './activityAction'

// Login admin
export const loginAdmin = (loginData, history) => async dispatch => {
  try {
    const res = await AuthService.login(loginData)
    dispatch(setAdmin(res.data.token))
    setAuthToken(res.data.token)
    localStorage.setItem('adminToken', res.data.token)
    history.push('/admin/activity')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Set admin
export const setAdmin = token => {
  return {
    type: SET_ADMIN,
    payload: token
  }
}

// Logout admin
export const logoutAdmin = () => dispatch => {
  dispatch(setAdmin({}))
  dispatch(clearErrors())
  setAuthToken()
  localStorage.removeItem('adminToken')
  dispatch({
    type: SET_CURRENT_ACTIVITY,
    payload: {}
  })
}

// Add Activity
export const addActivity = newActivity => async dispatch => {
  try {
    dispatch(setActivityLoading())
    const res = await ActivityService.addActivity(newActivity)
    dispatch(setActivity(res.data))
  } catch (err) {
    dispatch(setActivityUnloading())
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Add Bonus
export const addBonus = newBonus => async dispatch => {
  try {
    await BonusService.addBonus(newBonus)
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
