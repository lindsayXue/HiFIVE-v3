import { SET_ERRORS } from './types'

export const setErrors = errors => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: errors
  })
}
