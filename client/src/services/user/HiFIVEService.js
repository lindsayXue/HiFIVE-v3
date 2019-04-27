import Api from '../Api'

export default {
  getHistory() {
    return Api().get('hifives')
  },
  addHiFIVE(params) {
    return Api().post('hifives/add', params)
  }
}
