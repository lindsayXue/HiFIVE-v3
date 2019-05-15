import Api from './AdminApi'

export default {
  addBonus(params) {
    return Api().post('bonuses', params)
  },
  deleteBonus(id) {
    return Api().delete(`bonuses/${id}`)
  }
}
