import { setErrors } from './error'
import AdminPostService from '../services/admin/Post'

export const addPost = postData => async dispatch => {
  try {
    await AdminPostService.addPost(postData)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}

export const deletePost = id => async dispatch => {
  try {
    await AdminPostService.deletePost(id)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      dispatch(setErrors(errors))
    }
  }
}
