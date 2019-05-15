import Api from './AdminApi'

export default {
  editUser(params) {
    return Api().put('users/edit', params)
  }
}
