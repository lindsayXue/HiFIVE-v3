import Api from '../Api'

export default {
  addBonus(params) {
    return Api().post('bonuses', params)
  }
}
