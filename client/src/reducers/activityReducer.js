import { SET_CURRENT_ACTIVITY, ACTIVITY_LOADIND } from '../actions/types'

const initialState = {
  isLoading: false,
  activity: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIVITY_LOADIND:
      return {
        ...state,
        isLoading: true
      }
    case SET_CURRENT_ACTIVITY:
      return {
        isLoading: false,
        activity: action.payload
      }
    default:
      return state
  }
}
