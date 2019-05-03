import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './components/routing/Routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { withTheme } from '@material-ui/core/styles'

import './App.css'

import { loadUser } from './actions/auth'
import { loadAdmin } from './actions/adminAuth'
import setAuthToken from './services/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
if (localStorage.adminToken) {
  setAuthToken(localStorage.adminToken)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadAdmin())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route component={Routes} />
        <Footer />
      </Router>
    </Provider>
  )
}

export default withTheme()(App)
