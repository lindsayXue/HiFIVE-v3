import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'
import AdminRoute from './components/common/AdminRoute'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Banner from './components/banner/Banner'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home'
import User from './components/user/User'
import Post from './components/post/Post'
import Contribution from './components/contribution/Contribution'
import AddRecord from './components/record/AddRecord'
import AddHiFIVE from './components/hifive/AddHiFIVE'
import AdminLogin from './components/admin/Login'
import AdminActivity from './components/admin/Activity/Activity'
import AdminUser from './components/admin/Users/User'

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
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute path="/user" component={Banner} />
          <div className="container">
            <PrivateRoute exact path="/user/home" component={Home} />
            <PrivateRoute exact path="/user/profile" component={User} />
            <PrivateRoute exact path="/user/posts" component={Post} />
            <PrivateRoute
              exact
              path="/user/contribution"
              component={Contribution}
            />
            <PrivateRoute exact path="/user/record/add" component={AddRecord} />
            <PrivateRoute exact path="/user/hifive/add" component={AddHiFIVE} />
            <Route exact path="/admin" component={AdminLogin} />
            <AdminRoute
              exact
              path="/admin/activity"
              component={AdminActivity}
            />
            <AdminRoute exact path="/admin/users" component={AdminUser} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default withTheme()(App)
