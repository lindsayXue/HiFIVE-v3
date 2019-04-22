import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'

class TimeBoard extends Component {
  render() {
    const { activity } = this.props

    return (
      <div className="card mx-auto" style={{ width: '15rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title text-info">Activity</h5>
          <hr />
          <p className="card-text">
            <i className="fas fa-clock text-info" />{' '}
            <Moment format="DD/MM">{activity.start}</Moment>-
            <Moment format="DD/MM">{activity.end}</Moment>
          </p>
          <p className="card-text">
            <i className="fas fa-users text-info" /> {activity.participants}{' '}
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
}

TimeBoard.propTypes = {
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(mapStateToProps)(TimeBoard)
