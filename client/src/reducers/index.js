import { combineReducers } from 'redux'
import authReducer from './authReducer'
import activityReducer from './activityReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  activity: activityReducer,
  errors: errorReducer
})
