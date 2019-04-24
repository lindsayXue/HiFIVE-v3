import Api from '../Api'

export default {
  getUserRecord(params) {
    return Api().get('records/user', {
      params
    })
  }
}
