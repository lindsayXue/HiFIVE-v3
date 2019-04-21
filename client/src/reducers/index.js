import { combineReducers } from 'redux'

import activityReducer from './activityReducer'

export default combineReducers({
  // auth: authReducer
  // errors: errorReducer,
  // profile: profileReducer,
  // post: postReducer
  activity: activityReducer
})
