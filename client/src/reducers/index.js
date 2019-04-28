import { combineReducers } from 'redux'
import authReducer from './authReducer'
import activityReducer from './activityReducer'
import adminReducer from './adminReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  activity: activityReducer,
  admin: adminReducer,
  errors: errorReducer
})
