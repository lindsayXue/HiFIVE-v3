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
  state = {
    userWinner: [],
    teamWinner: [],
    error: ''
  }

  async componentDidMount() {
    try {
      const resUser = await UserService.getUserWinner()
      const resTeam = await TeamService.getTeamWinner()
      const winnerUserData = resUser.data
      const winnerTeamData = resTeam.data
      this.setState({
        userWinner: winnerUserData.map(winner => {
          return { name: winner.name, points: winner.points }
        }),
        teamWinner: winnerTeamData.map(winner => {
          return { name: winner.name, points: winner.points }
        })
      })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
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
        <Rank title="Personal" winner={userWinner}>
          Personal
        </Rank>
        <Rank title="Team" winner={teamWinner}>
          Team
        </Rank>
      </Paper>
    )
  }
}

export default withStyles(styles)(Contribution)
