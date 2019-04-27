import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    console.log('2')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('3')
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
