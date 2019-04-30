import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = []

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ERRORS:
      return [...state, payload]
    case CLEAR_ERRORS:
      return state.filter(error => error.id !== payload)
    default:
      return state
  }
}
