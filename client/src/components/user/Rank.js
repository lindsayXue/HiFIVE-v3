import React, { Component } from 'react'
import RankContent from './RankContent'
import UserService from '../../services/user/UserService'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

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
      <Grid container justify="center" spacing={40}>
        <Grid item md={6}>
          <RankContent title="Exercise" rank={pointsRank} />
        </Grid>
        <Grid item md={6}>
          <RankContent title="HiFIVE" rank={hifiveRank} />
        </Grid>
      </Grid>
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
