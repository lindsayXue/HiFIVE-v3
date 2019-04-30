import { SET_ERRORS } from './types'

export const setErrors = msg => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: { msg }
  })
}
