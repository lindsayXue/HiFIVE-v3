import axios from 'axios'
import store from '../../store'
import { adminLogout } from '../../actions/adminAuth'

export default () => {
  let baseURL
  if (process.env.NODE_ENV === 'production') {
    baseURL = `https://www.hifivenz.org/api/`
  } else {
    baseURL = `http://localhost:5000/api/`
  }

  const instance = axios.create({
    baseURL
  })

  // Add a response interceptor
  instance.interceptors.response.use(
    response => {
      // Do something with response data
      return response
    },
    err => {
      if (err.response.status && err.response.status === 401) {
        store.dispatch(adminLogout())
      }
      // Do something with response error
      return Promise.reject(err)
    }
  )

  return instance
}
