import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getActivity } from '../../actions/activityAction'
import TeamService from '../../services/user/TeamService'
import TimeBoard from './TimeBoard'
import Userinfo from './Userinfo'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  banner: {
    height: '20rem',
    padding: '20px',
    backgroundColor: theme.palette.secondary.light
  },
  welcome: {
    textAlign: 'center'
  },
  postLink: {
    textAlign: 'center'
  }
})

class Banner extends Component {
  state = {
    team: '',
    posts: []
  }

  async componentDidMount() {
    const teamRes = await TeamService.getUserTeam(this.props.auth.user.team)

    this.setState({ team: teamRes.data })

    this.props.getActivity()
  }

  render() {
    const { user } = this.props.auth
    const { team } = this.state
    const { classes } = this.props

    const flagStyle = {
      color: !team.color ? '' : team.color
    }

    return (
      <Grid
        className={classes.banner}
        container
        justify="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item md={7} className={classes.welcome}>
          <Typography variant="h4">
            Welcome to{' '}
            <Typography inline component="span" variant="h4" color="primary">
              HiFIVE
            </Typography>{' '}
            Community
          </Typography>
          <Userinfo user={user} flagStyle={flagStyle} />
        </Grid>
        <Grid item md={4}>
          <TimeBoard />
        </Grid>
      </Grid>
    )
  }
}

Banner.propTypes = {
  auth: PropTypes.object.isRequired,
  getActivity: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getActivity }
)(withStyles(styles)(Banner))
