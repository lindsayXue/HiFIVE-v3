import RecordService from '../services/user/Record'
import { setErrors } from './error'
import { loadUser } from './auth'

export const addRecord = (newRecord, history) => async dispatch => {
  try {
    await RecordService.addRecord(newRecord)

    dispatch(loadUser())
    history.push('/user/profile')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
