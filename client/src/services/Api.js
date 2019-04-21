import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `/api/`
    // TODO: Set Herder
  })
}
