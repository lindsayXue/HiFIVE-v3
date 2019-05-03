import Api from '../Api'

export default {
  getUserRecord(params) {
    return Api().get('records/user', {
      params
    })
  },
  addRecord(params) {
    return Api().post('records/add', params)
  },
  getRecods(params) {
    return Api().get('records', params)
  }
}
