import React, { Component } from 'react'
import Rank from './Rank'
import { Link as RouterLink } from 'react-router-dom'
import UserService from '../../services/user/User'
import TeamService from '../../services/user/Team'
import { Typography, Paper, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 'auto'
  },
  backBtn: {
    float: 'right'
  }
})

class Contribution extends Component {
  _isMounted = false

  state = {
    userWinner: [],
    teamWinner: [],
    error: ''
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const resUser = await UserService.getUserWinner()
      const resTeam = await TeamService.getTeamWinner()
      const winnerUserData = resUser.data
      const winnerTeamData = resTeam.data
      if (this._isMounted) {
        this.setState({
          userWinner: winnerUserData.map(winner => {
            return { name: winner.name, points: winner.points }
          }),
          teamWinner: winnerTeamData.map(winner => {
            return { name: winner.name, points: winner.points }
          })
        })
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({ error: err.response.data })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { userWinner, teamWinner } = this.state
    const { classes, style } = this.props

    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Contribution
          <Button
            component={RouterLink}
            to="/user/contribution"
            className={classes.backBtn}
            variant="contained"
            color="primary"
          >
            More
          </Button>
        </Typography>
        <Rank title="Individual" winner={userWinner} />
        <Rank title="Team" winner={teamWinner} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Contribution)
