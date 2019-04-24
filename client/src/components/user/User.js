import React, { Component } from 'react'
import Record from './Record'
import Member from './Member'

class User extends Component {
  render() {
    return (
      <div>
        <div className="row d-flex justify-content-around">
          <div className="card col-md-7 px-0 mt-2">
            <Record />
          </div>
          <div className="card col-md-4 px-0 mt-2">
            <Member />
          </div>
        </div>
      </div>
    )
  }
}

export default User
