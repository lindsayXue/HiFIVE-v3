import Api from '../Api'

export default {
  login(credentials) {
    return Api().post('admin/login', credentials)
  }
}
