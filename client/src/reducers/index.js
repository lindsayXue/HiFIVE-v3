import { combineReducers } from 'redux'
import auth from './auth'
import activity from './activity'
import errors from './errors'
import adminAuth from './adminAuth'
import footer from './footer'

export default combineReducers({
  auth,
  activity,
  errors,
  adminAuth,
  footer
})
