import Api from './AdminApi'

export default {
  addActivity(params) {
    return Api().post('activity', params)
  },
  editActivityStatus() {
    return Api().put('activity')
  }
}
