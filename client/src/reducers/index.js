import { combineReducers } from 'redux'
// import authReducer from './authReducer'
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';
// import postReducer from './postReducer';
import activityReducer from './activityReducer'

export default combineReducers({
  // auth: authReducer
  // errors: errorReducer,
  // profile: profileReducer,
  // post: postReducer
  activity: activityReducer
})
