import Api from '../Api'

export default {
  addFooter(params) {
    return Api().put('footer', params)
  }
}
