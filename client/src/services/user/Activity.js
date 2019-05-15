import Api from './Api'

export default {
  getActivity() {
    return Api().get('activity')
  }
}
