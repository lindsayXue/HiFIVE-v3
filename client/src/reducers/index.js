import { combineReducers } from 'redux'
import auth from './auth'
import activity from './activity'
import errors from './errors'
import adminAuth from './adminAuth'

export default combineReducers({
  auth,
  activity,
  errors,
  adminAuth
})
