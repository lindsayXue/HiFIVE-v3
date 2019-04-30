import { combineReducers } from 'redux'
import auth from './auth'
import activity from './activity'
import errors from './errors'

export default combineReducers({
  auth,
  activity,
  errors
})
