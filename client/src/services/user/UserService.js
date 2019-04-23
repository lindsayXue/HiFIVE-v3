import Api from '../Api'

export default {
  getUserWinner() {
    return Api().get('users/winner')
  }
}
