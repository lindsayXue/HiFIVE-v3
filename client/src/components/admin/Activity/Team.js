import React, { Component } from 'react'
import {
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TeamService from '../../../services/user/Team'
import { Bar } from 'react-chartjs-2'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '20px'
  },
  createBtn: {
    float: 'right'
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
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Team
        </Typography>
        <Grid
          container
          justify="space-around"
          alignItems="flex-start"
          spacing={16}
        >
          <Grid item md={3} xs={12}>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Team" />
                <ListItemText
                  primary="Members"
                  style={{ textAlign: 'right' }}
                />
              </ListItem>
              {teams.map(team => (
                <ListItem key={team._id} className={classes.listItem}>
                  <ListItemText primary={team.name} />
                  <ListItemText
                    secondary={team.member}
                    style={{ textAlign: 'right' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={6} xs={12}>
            <p>
              <Bar
                data={chartData}
                width={400}
                height={300}
                options={chartOptions}
              />
            </p>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default connect(
  null,
  {}
)(withStyles(styles)(Team))
