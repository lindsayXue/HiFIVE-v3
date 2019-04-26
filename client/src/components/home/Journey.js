import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import capeReinga from '../../assets/capeReinga1.jpg'
import auckland from '../../assets/auckland.jpg'
import wellington from '../../assets/wellington.jpg'
import christchurch from '../../assets/christchurch.jpg'
import dunedin from '../../assets/dunedin.jpg'
import stirlingpoint from '../../assets/stirlingpoint.jpg'

class Journey extends Component {
  state = {
    distanceNZ: 2122000
  }
  ß
  render() {
    const { activity } = this.props
    const { distanceNZ } = this.state

    let percent = ((activity.points * 1000) / distanceNZ).toFixed(2)
    if (percent > 100) {
      percent = 100
    }

    const progressStyle = {
      width: `${percent}%`
    }

    const journeyImg = percent => {
      if (percent >= 0 && percent < 20) {
        return <img src={capeReinga} className="card-img-top" alt="city" />
      }
      if (percent >= 20 && percent < 40) {
        return <img src={auckland} className="card-img-top" alt="city" />
      }
      if (percent >= 40 && percent < 60) {
        return <img src={wellington} className="card-img-top" alt="city" />
      }
      if (percent >= 60 && percent < 80) {
        return <img src={christchurch} className="card-img-top" alt="city" />
      }
      if (percent >= 80 && percent < 100) {
        return <img src={dunedin} className="card-img-top" alt="city" />
      }
      if (percent === 100) {
        return <img src={stirlingpoint} className="card-img-top" alt="city" />
      }
    }

    return (
      <div>
        {journeyImg(percent)}
        <h5 className="card-header text-primary">
          {activity.points * 10} meters NOW!
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
                    'text-primary': percent >= 0
                  })}
                />
                Cape Reinga
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-primary': percent >= 20
                  })}
                />
                Auckland
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-primary': percent >= 40
                  })}
                />
                Wellington
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-primary': percent >= 60
                  })}
                />
                Christchurch
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-primary': percent >= 80
                  })}
                />
                Dunedin
              </small>
            </div>
            <div className="text-muted">
              <small>
                <i
                  className={classnames('fas fa-map-marker-alt', {
                    'text-primary': percent >= 100
                  })}
                />
                Stirling Point
              </small>
            </div>
          </div>
          <div className="progress m-2">
            <div
              className="progress-bar progress-bar-striped bg-default"
              role="progressbar"
              style={progressStyle}
              aria-valuenow={percent}
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
