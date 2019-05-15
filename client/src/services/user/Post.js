import Api from './Api'

export default {
  getPosts() {
    return Api().get('adminposts')
  }
}
