import { setErrors } from './error'
import AdminFooterService from '../services/admin/Footer'
import FooterService from '../services/user/Footer'
import { GET_FOOTER } from './types'

export const addFooter = newFooter => async dispatch => {
  try {
    const res = await AdminFooterService.addFooter(newFooter)
    dispatch({
      type: GET_FOOTER,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}

export const getFooter = () => async dispatch => {
  try {
    const res = await FooterService.getFooter()
    dispatch({
      type: GET_FOOTER,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
