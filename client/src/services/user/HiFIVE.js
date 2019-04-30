import Api from '../Api'

export default {
  getHistory() {
    return Api().get('hifives')
  },
  getRank() {
    return Api().get('hifives/rank')
  },
  addHiFIVE(params) {
    return Api().post('hifives/add', params)
  },
  getUserHiFIVE() {
    return Api().get('hifives/user')
  }
}
