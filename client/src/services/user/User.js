import Api from './Api'

export default {
  getUserWinner() {
    return Api().get('users/winner')
  },
  getUsers(params) {
    return Api().get('users', {
      params
    })
  },
  getUserRank(params) {
    return Api().get(`users/rank/${params.points}/${params.hifive}`)
  },
  getUserByID(id) {
    return Api().get(`users/${id}`)
  }
}
