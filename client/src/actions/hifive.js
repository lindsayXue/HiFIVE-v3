import { setErrors } from './error'
import HiFIVEService from '../services/user/HiFIVE'

export const addHiFIVE = (hifiveData, history) => async dispatch => {
  try {
    await HiFIVEService.addHiFIVE(hifiveData)

    history.push('/user/home')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
