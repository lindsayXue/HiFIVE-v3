import Api from '../Api'

export default {
  register(credentials) {
    return Api().post('users/register', credentials)
  },
  login() {
    return Api().get('users/login')
  },
  getUserAuth() {
    return Api().get('auth')
  }
}
