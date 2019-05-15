import Api from './AdminApi'

export default {
  addPost(params) {
    return Api().post('adminposts', params)
  },
  deletePost(id) {
    return Api().delete(`adminposts/${id}`)
  }
}
