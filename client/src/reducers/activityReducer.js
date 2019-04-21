import { SET_CURRENT_ACTIVITY } from '../actions/types'

const initialState = {
  activity: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ACTIVITY:
      return {
        ...state,
        activity: action.payload
      }
    default:
      return state
  }
}
