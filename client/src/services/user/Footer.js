import Api from './Api'

export default {
  getFooter() {
    return Api().get('footer')
  }
}
