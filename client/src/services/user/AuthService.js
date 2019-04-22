import Api from '../Api'

export default {
  register(credentials) {
    return Api().post('user/register', credentials)
  },
  login(credentials) {
    return Api().post('user/login', credentials)
  }
}
