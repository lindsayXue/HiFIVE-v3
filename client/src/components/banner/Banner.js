import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getActivity } from '../../actions/activity'
import TeamService from '../../services/user/Team'
import TimeBoard from './TimeBoard'
import Userinfo from './Userinfo'
import PropTypes from 'prop-types'
import { Grid, Typography, Hidden } from '@material-ui/core'
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
    try {
      if (this.props.auth.user) {
        const teamRes = await TeamService.getUserTeam(this.props.auth.user.team)
        this.setState({ team: teamRes.data })
      }
      this.props.getActivity()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { user } = this.props.auth
    const { team } = this.state
    const { classes } = this.props

    const flagStyle = {
      color: !team.color ? '' : team.color
    }

    const xllgmdTitle = (
      <Typography variant="h4">
        Welcome to{' '}
        <Typography inline component="span" variant="h4" color="primary">
          HiFIVE
        </Typography>{' '}
        Community
      </Typography>
    )

    const xsTitle = (
      <Typography variant="h6">
        Welcome to{' '}
        <Typography inline component="span" variant="h6" color="primary">
          HiFIVE
        </Typography>{' '}
        Community
      </Typography>
    )

    return (
      <Grid
        className={classes.banner}
        container
        justify="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item lg={5} md={6} xs={11} className={classes.welcome}>
          <Hidden xsDown>{xllgmdTitle}</Hidden>
          <Hidden smUp>{xsTitle}</Hidden>
          <Userinfo user={user} flagStyle={flagStyle} />
        </Grid>
        <Grid item md={4} xs={11}>
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
