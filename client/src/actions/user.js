import AdminUserService from '../services/admin/User'
import { setErrors } from './error'

export const editUser = data => async dispatch => {
  try {
    await AdminUserService.editUser(data)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
