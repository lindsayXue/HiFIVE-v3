import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import setAuthToken from './services/setAuthToken'
import { getUserProfile } from './actions/userAction'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'

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
import { withTheme } from '@material-ui/core/styles'
import UserService from './services/user/UserService'

import './App.css'

// Check for token
if (localStorage.googleToken) {
  // Set auth token header auth
  setAuthToken(localStorage.googleToken)

  // Get user info
  // Set user and isAuthenticated
  store.dispatch(getUserProfile())
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default withTheme()(App)
