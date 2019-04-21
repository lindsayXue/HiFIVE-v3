import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const TimeBoard = props => {
  const { start, end, participants } = props.Activity
  console.log(participants)

  return (
    <div className="card mx-auto" style={{ width: '15rem' }}>
      <div className="card-body text-center">
        <h5 className="card-title text-info">Activity</h5>
        <hr />
        <p className="card-text">
          <i className="fas fa-clock text-info" />{' '}
          <Moment format="DD/MM">{new Date(start)}</Moment>-
          <Moment format="DD/MM">{new Date(end)}</Moment>
        </p>
        <p className="card-text">
          <i className="fas fa-users text-info" /> {participants}{' '}
          {/* <Link to="/posts">
            <button type="button" className="btn btn-info btn-sm float-right">
              Posts
            </button>
          </Link> */}
        </p>
      </div>
    </div>
  )
}

// TimeBoard.propTypes = {
//   Activity: PropTypes.object.isRequired
// }

export default TimeBoard
