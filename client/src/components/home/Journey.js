import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import capeReinga from '../../assets/capeReinga.jpg'
import auckland from '../../assets/auckland.jpg'
import wellington from '../../assets/wellington.jpg'
import christchurch from '../../assets/christchurch.jpg'
import dunedin from '../../assets/dunedin.jpg'
import stirlingpoint from '../../assets/stirlingpoint.jpg'

class Journey extends Component {
  state = {
    distanceNZ: 2122000
  }

  render() {
    const { activity } = this.props
    const { distanceNZ } = this.state

    let percent = (activity.points * 1000) / distanceNZ
    if (percent > 100) {
      percent = 100
    }

    const progressStyle = {
      width: `${percent}%`
    }

    return (
      <div>
        {percent >= 0 && percent < 20 ? (
          <img src={capeReinga} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        {percent >= 20 && percent < 40 ? (
          <img src={auckland} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        {percent >= 40 && percent < 60 ? (
          <img src={wellington} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        {percent >= 60 && percent < 80 ? (
          <img src={christchurch} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        {percent >= 80 && percent < 100 ? (
          <img src={dunedin} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        {percent === 100 ? (
          <img src={stirlingpoint} className="card-img-top" alt="city" />
        ) : (
          ''
        )}
        <h5 className="card-header text-info">
          Journey
          <small className="text-muted font-italic float-right">
            One point = Ten meters
          </small>
        </h5>
        <div className="card-body">
          <div className="row d-flex justify-content-between">
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 0
                  })}
                >
                  Cape Reinga
                </i>
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 20
                  })}
                >
                  Auckland
                </i>
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 40
                  })}
                >
                  Wellington
                </i>
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 60
                  })}
                >
                  Christchurch
                </i>
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 80
                  })}
                >
                  Dunedin
                </i>
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-info': percent >= 100
                  })}
                >
                  Stirling Point
                </i>
              </small>
            </div>
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped bg-info"
              role="progressbar"
              style={progressStyle}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent} %
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Journey.propTypes = {
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(mapStateToProps)(Journey)
