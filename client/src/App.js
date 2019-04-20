import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
// import Login from './components/auth/Login'
// import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import User from './components/user/User'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/user" component={User} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
