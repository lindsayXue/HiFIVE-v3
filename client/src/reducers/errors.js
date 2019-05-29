import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types'
import _ from 'lodash'

const initialState = {}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ERRORS:
      return { ...state, ...payload }
    case CLEAR_ERRORS:
      return _.omit(state, payload)
    default:
      return state
  }
}
