import Api from '../Api'

export default {
  addActivity(params) {
    return Api().post('activity', params)
  }
}
