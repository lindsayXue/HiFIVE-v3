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
          <h6 className="card-title text-default">Activity</h6>
          <hr />
          <p className="card-text">
            <i className="fas fa-clock text-default" />{' '}
            <Moment format="DD/MM">{activity.start}</Moment>-
            <Moment format="DD/MM">{activity.end}</Moment>{' '}
            <i className="fas fa-users text-default" /> {activity.participants}
          </p>
          {/* <p className="card-text">
            <i className="fas fa-users text-default" /> {activity.participants}
          </p> */}
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
