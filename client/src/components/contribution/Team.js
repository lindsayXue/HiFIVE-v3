import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import TeamService from '../../services/user/Team'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper } from '@material-ui/core'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class Team extends Component {
  _isMounted = false

  state = {
    teams: [],
    error: null
  }
  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await TeamService.getTeams()
      if (this._isMounted) {
        this.setState({ teams: res.data })
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
    const { teams } = this.state
    const { classes, style } = this.props

    const chartData = {
      labels: teams.map(team => team.name),
      datasets: [
        {
          backgroundColor: teams.map(team => team.color),
          data: teams.map(team => team.points)
        }
      ]
    }

    const chartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel
          }
        }
      },
      maintainAspectRatio: false
    }

    return (
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h5" component="h3">
          Team
        </Typography>
        <p>
          <Bar
            data={chartData}
            width={400}
            height={300}
            options={chartOptions}
          />
        </p>
      </Paper>
    )
  }
}

export default withStyles(styles)(Team)
