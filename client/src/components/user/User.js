import React, { Component } from 'react'
import Record from './Record'
import Rank from './Rank'
import Member from './Member'

class User extends Component {
  render() {
    return (
      <div>
        <div className="row d-flex justify-content-around">
          <div className="card col-md-7 px-0 mt-2">
            <Record />
          </div>
          <div className="col-md-4 mt-2">
            <div className="mb-2">
              <Rank />
            </div>
            <div>
              <Member />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User
