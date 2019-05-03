import Api from '../Api'

export default {
  addFooter(params) {
    return Api().post('footer', params)
  }
}
