import React, { Component } from 'react'
import Activity from './Activity'
import Notification from './Notification'

class Banner extends Component {
  render() {
    return (
      <div>
        <div className="banner bg-light row justice-content-around">
          <div className="col-md-7 my-auto text-center text-dark">
            <h3 className="mb-5">
              Welcome to
              <span className="text-info"> HiFIVE </span>
              Community
            </h3>
            <p>
              <i className="fas fa-user" /> UserName{' '}
              <i className="fas fa-flag" />
            </p>
          </div>
          <div className="col-md-3 my-auto">
            <Activity />
          </div>
        </div>
        <Notification />
      </div>
    )
  }
}

export default Banner
