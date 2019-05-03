import AdminBonusService from '../services/admin/Bonus'
import { setErrors } from './error'

export const addBonus = data => async dispatch => {
  try {
    await AdminBonusService.addBonus(data)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}

export const deleteBonus = id => async dispatch => {
  try {
    await AdminBonusService.deleteBonus(id)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
