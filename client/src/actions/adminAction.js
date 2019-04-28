import { SET_ADMIN, GET_ERRORS } from './types'

export const loginAdmin = (loginData, history) => async dispatch => {
  try {
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
