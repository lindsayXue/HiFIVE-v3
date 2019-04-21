import React, { Component } from 'react'

import Post from './Post'
import Contribution from './Contribution'
import Journey from './Journey'

class Home extends Component {
  render() {
    return (
      <div className="home row d-flex justify-content-between">
        <div className="card text-info bg-light col-md-5 mt-2 px-0">
          <h5 className="card-header">Posts</h5>
          <div className="card-body">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
        <div className="card col-md-6 px-0 mt-2">
          <Journey />
          <Contribution />
        </div>
        {/* <div className="card col-sm-12 mt-2 px-0">
          <Contribution />
        </div> */}
      </div>
    )
  }
}

export default Home
