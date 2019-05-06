import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import UserRoutes from './components/routing/User'
import AdminRoutes from './components/routing/Admin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import NotFound from './components/layout/NotFound'
import { withTheme } from '@material-ui/core/styles'

import './App.css'

import { loadUser } from './actions/auth'
import { loadAdmin } from './actions/adminAuth'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadAdmin())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/" component={UserRoutes} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )
}

export default withTheme()(App)
