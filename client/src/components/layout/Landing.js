import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="landing bg-light row justice-content-around">
        <div className="col-md-7 my-auto text-center text-dark">
          <h3 className="mb-5">
            Welcome to
            <span className="text-info"> HiFIVE </span>
            Community
          </h3>
          <p>
            <i className="fas fa-user" /> UserName <i className="fas fa-flag" />
          </p>
        </div>
        <div className="col-md-3 my-auto">
          <div className="card mx-auto" style={{ width: '15rem' }}>
            <div className="card-body text-center">
              <h5 className="card-title ">Activity</h5>
              <hr />
              <p className="card-text">
                <i className="fas fa-clock" /> time - time
              </p>
              <p className="card-text">
                <i className="fas fa-users" /> 0
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
