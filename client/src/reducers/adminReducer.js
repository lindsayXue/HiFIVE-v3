import isEmpty from '../validation/is-empty'
import { SET_ADMIN } from '../actions/types'

const initialState = {
  isAdmin: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: !isEmpty(action.payload)
      }
    default:
      return state
  }
}
