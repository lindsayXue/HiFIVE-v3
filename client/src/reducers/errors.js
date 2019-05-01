import { SET_ERRORS, CLEAR_ERROR } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ERRORS:
      return { ...state, ...payload }
    case CLEAR_ERROR:
      delete state[payload]
      return { ...state }
    default:
      return state
  }
}
