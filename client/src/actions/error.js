import { SET_ERRORS, CLEAR_ERRORS } from './types'

export const setErrors = errors => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: errors
  })
}

export const clearErrors = errorsName => dispatch => {
  errorsName.forEach(error => {
    dispatch({
      type: CLEAR_ERRORS,
      payload: error
    })
  })
}
