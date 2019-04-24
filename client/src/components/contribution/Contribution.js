import React, { Component } from 'react'
import Personal from './Personal'
import Team from './Team'
// import { Link } from 'react-router-dom'

export default class Contribution extends Component {
  render() {
    return (
      <div>
        <div className="row d-flex justify-content-around">
          <div className="card col-md-6 px-0 mt-2">
            <Personal />
          </div>
          <div className="card col-md-5 px-0 mt-2">
            <Team />
          </div>
        </div>
        {/* <Link to="/user/home">
          <button type="button" className="btn btn-md btn-info float-right m-4">
            Back
          </button>
        </Link> */}
      </div>
    )
  }
}
