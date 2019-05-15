import Api from './AdminApi'

export default {
  addFooter(params) {
    return Api().put('footer', params)
  }
}
