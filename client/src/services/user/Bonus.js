import Api from './Api'

export default {
  getBonuses() {
    return Api().get('bonuses')
  }
}
