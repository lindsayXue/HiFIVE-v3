import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, Link } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 200,
    textAlign: 'center',
    margin: 'auto'
  }
})

class TimeBoard extends Component {
  render() {
    const { activity, classes } = this.props

    return (
      <Paper className={classes.root} elevation={2}>
        <Typography variant="h5" color="primary">
          Activity
        </Typography>
        <hr />
        <Typography component="p">
          <i className="fas fa-clock text-primary" />{' '}
          <Moment format="DD/MM">{activity.start}</Moment> ——{' '}
          <Moment format="DD/MM">{activity.end}</Moment>{' '}
        </Typography>
        <Typography component="p">
          <i className="fas fa-users text-primary" /> {activity.participants}
        </Typography>
        <Link variant="body2" component={RouterLink} to="/user/posts">
          <i className="fas fa-bullhorn" />
          <Typography inline> Click here to Posts Board </Typography>
          <i className="fas fa-arrow-left" />
        </Link>
      </Paper>
    )
  }
}

TimeBoard.propTypes = {
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity
})

export default connect(mapStateToProps)(withStyles(styles)(TimeBoard))
