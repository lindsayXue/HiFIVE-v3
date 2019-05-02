import {
  GET_ACTIVITY,
  ACTIVITY_ERROR,
  CLEAR_ACTIVITY,
  CLEAR_ACTIVITY_ERROR
} from '../actions/types'

const initialState = {
  loading: false,
  activity: null,
  errors: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activity: payload,
        loading: false
      }
    case CLEAR_ACTIVITY:
      return {
        ...state,
        activity: null,
        loading: false
      }
    case ACTIVITY_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      }
    case CLEAR_ACTIVITY_ERROR:
      delete state.errors[payload]
      return { ...state }
    default:
      return state
  }
}
