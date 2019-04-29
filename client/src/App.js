import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import setAuthToken from './services/setAuthToken'
import { getUserProfile } from './actions/userAction'

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

import { withTheme } from '@material-ui/core/styles'

import './App.css'
import { setAdmin, logoutAdmin } from './actions/adminAction'

// Check for token
if (localStorage.googleToken) {
  // Set auth token header auth
  setAuthToken(localStorage.googleToken)

  // Get user info
  // Set user and isAuthenticated
  store.dispatch(getUserProfile())
}

// Check for Admin token
if (localStorage.adminToken) {
  // Set auth token header auth
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.adminToken)
  // Set user and isAuthenticated
  store.dispatch(setAdmin(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin())
    // Redirect to login
    window.location.href = '/admin'
  }
}

class App extends Component {
  render() {
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
              <PrivateRoute
                exact
                path="/user/record/add"
                component={AddRecord}
              />
              <PrivateRoute
                exact
                path="/user/hifive/add"
                component={AddHiFIVE}
              />
              <Route exact path="/admin" component={AdminLogin} />
              <AdminRoute
                exact
                path="/admin/activity"
                component={AdminActivity}
              />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default withTheme()(App)
