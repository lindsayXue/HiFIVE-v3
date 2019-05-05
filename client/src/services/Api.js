import axios from 'axios'

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return axios.create({
      baseURL: `https://www.hifivenz.org/api/`
    })
  }
  return axios.create({
    baseURL: `http://localhost:5000/api/`
  })
}
