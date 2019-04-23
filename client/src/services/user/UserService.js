import Api from '../Api'

export default {
  getUserWinner() {
    return Api().get('users/winner')
  },
  getUsers(params) {
    return Api().get('users', {
      params
    })
  }
}
