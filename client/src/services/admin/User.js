import Api from '../Api'

export default {
  editUser(params) {
    return Api().put('users/edit', params)
  }
}
