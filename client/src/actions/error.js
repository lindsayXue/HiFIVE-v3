import { SET_ERRORS, CLEAR_ERROR } from './types'

export const setErrors = errors => dispatch => {
  dispatch({
    type: SET_ERRORS,
    payload: errors
  })
}

export const clearError = errorName => dispatch => {
  dispatch({
    type: CLEAR_ERROR,
    payload: errorName
  })
}
