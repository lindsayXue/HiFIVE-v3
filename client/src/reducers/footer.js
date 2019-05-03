import { GET_FOOTER } from '../actions/types'

const initialState = {
  loading: false,
  footer: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_FOOTER:
      return {
        ...state,
        footer: payload,
        loading: false
      }
    default:
      return state
  }
}
