import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Banner from './components/banner/Banner'
// import Login from './components/auth/Login'
// import Register from './components/auth/Register'
import Home from './components/home/Home'
import User from './components/user/User'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Banner />
            <div className="container">
              <Route exact path="/home" component={Home} />
              <Route exact path="/user" component={User} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
