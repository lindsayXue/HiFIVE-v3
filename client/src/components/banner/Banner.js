import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getActivity } from '../../actions/activityAction'
import TimeBoard from './TimeBoard'
import PostCarousel from './postCarousel'

class Banner extends Component {
  componentDidMount() {
    this.props.getActivity()
  }

  render() {
    const { activity } = this.props

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
            <TimeBoard Activity={activity.activity} />
          </div>
        </div>
        <PostCarousel />
      </div>
    )
  }
}

Banner.propTypes = {
  activity: PropTypes.object.isRequired,
  getActivity: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(
  mapStateToProps,
  { getActivity }
)(Banner)
