import React, { Component } from 'react'
import TimeBoard from './TimeBoard'
import PostCarousel from './postCarousel'

class Banner extends Component {
  render() {
    return (
      <div>
        <div className="banner bg-light row justice-content-around">
          <div className="col-md-7 my-auto text-center text-dark">
            <h3 className="my-3">
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
            <TimeBoard />
          </div>
        </div>
        <PostCarousel />
      </div>
    )
  }
}
export default Banner
