import Api from '../Api'

export default {
  getUserWinner() {
    return Api().get('users/winner')
  },
  getUsers(params) {
    return Api().get('users', {
      params
    })
  },
  getUserProfile() {
    return Api().get('users/profile')
  },
  getUserRank(params) {
    return Api().get(`users/rank/${params.points}/${params.hifive}`)
  }
}
