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
  getUserProfile(params) {
    return Api().post('users/profile', params)
  },
  getUserRank(params) {
    return Api().get(`users/rank/${params.points}/${params.hifive}`)
  }
}
