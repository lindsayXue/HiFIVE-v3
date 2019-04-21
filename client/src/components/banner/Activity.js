import React from 'react'
import { Link } from 'react-router-dom'

const Activity = () => {
  return (
    <div className="card mx-auto" style={{ width: '15rem' }}>
      <div className="card-body text-center">
        <h5 className="card-title text-info">Activity</h5>
        <hr />
        <p className="card-text">
          <i className="fas fa-clock" /> time - time
        </p>
        <p className="card-text">
          <i className="fas fa-users" /> 0
        </p>
        <Link to="/posts">
          <button type="button" className="btn btn-info btn-sm">
            Posts board
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Activity
