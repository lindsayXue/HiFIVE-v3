import React, { Component } from 'react'
import RankContent from './RankContent'
import UserService from '../../services/user/UserService'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Rank extends Component {
  state = {
    pointsRank: 0,
    hifiveRank: 0,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await UserService.getUserRank({
        points: this.props.auth.user.points,
        hifive: this.props.auth.user.hifive
      })
      this.setState({
        pointsRank: res.data.pointsRank,
        hifiveRank: res.data.hifiveRank
      })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { pointsRank, hifiveRank } = this.state
    return (
      <div className="card p-0 border border-white">
        <div className="card-body p-0 row d-flex justify-content-center">
          <div className="col-md-6 mb-2">
            <RankContent title="Exercise" rank={pointsRank} />
          </div>
          <div className="col-md-6 mb-2">
            <RankContent title="HiFIVE" rank={hifiveRank} />
          </div>
        </div>
      </div>
    )
  }
}

Rank.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Rank)
