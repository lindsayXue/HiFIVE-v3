import { GET_ACTIVITY, ACTIVITY_ERROR, CLEAR_ACTIVITY } from '../actions/types'

const initialState = {
  loading: false,
  activity: null,
  error: {}
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
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
