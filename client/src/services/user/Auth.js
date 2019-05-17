import Api from './Api'

export default {
  signinGoogle() {
    return Api().get('/auth/google')
  },
  register(params) {
    return Api().post('users/register', params)
  },
  // login() {
  //   return Api().get('users/login')
  // },
  logout() {
    return Api().get('auth/logout')
  },
  getUserAuth() {
    return Api().get('auth')
  }
}
