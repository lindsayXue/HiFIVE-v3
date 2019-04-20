import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/hifive.png'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt="Logo"
            />{' '}
            HiFIVE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  {' '}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  {' '}
                  User
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="" className="nav-link">
                  {' '}
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
