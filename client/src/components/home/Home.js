import React, { Component } from 'react'
import Journey from './Journey'
import Contribution from './Contribution'

class Home extends Component {
  render() {
    return (
      <div className="home row d-flex justify-content-around">
        <div className="card col-md-7 px-0 mt-2">
          <Journey />
        </div>
        <div className="card col-md-4 px-0 mt-2">
          <Contribution />
        </div>
      </div>
    )
  }
}

export default Home
