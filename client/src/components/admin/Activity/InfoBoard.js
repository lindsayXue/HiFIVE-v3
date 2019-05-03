import React, { Component } from 'react'
import {
  Typography,
  Paper,
  CircularProgress,
  Button,
  TextField
} from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'
import moment from 'moment'
import DatePicker from '../../common/DatePicker'
import { addActivity } from '../../../actions/activity'
import { clearActivityError } from '../../../actions/activity'
import ErrorInfo from '../../common/ErrorInfo'

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

class InfoBoard extends Component {
  state = {
    start: '',
    duration: 0,
    end: '',
    disableFuture: false
  }

  onSubmit = e => {
    e.preventDefault()

    const newActivity = {
      start: this.state.start,
      end: this.state.end,
      duration: this.state.duration
    }

    this.props.addActivity(newActivity)
  }

  onStartChange = value => {
    this.setState({
      start: value,
      end: moment(value)
        .add(this.state.duration, 'days')
        .format('YYYY-MM-DD')
    })

    this.props.clearActivityError('start')
  }

  onDurationChange = e => {
    if (!this.state.start) {
      return this.setState({
        duration: e.target.value,
        end: ''
      })
    }
    this.setState({
      duration: e.target.value,
      end: moment(this.state.start)
        .add(e.target.value, 'days')
        .format('YYYY-MM-DD')
    })
    this.props.clearActivityError('duration')
  }

  onErrorClose = () => {
    this.props.clearActivityError('server')
  }

  render() {
    const { activity, classes, style, errors } = this.props
    const { disableFuture, duration, end } = this.state

    return (
      <Paper className={classes.root} elevation={2} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Activity
        </Typography>
        <hr />
        {activity.loading && (
          <CircularProgress className={classes.progress} color="primary" />
        )}
        {activity.activity === null ||
        Object.keys(activity.activity).length === 0 ? (
          <div>
            <Typography variant="h6" color="secondary">
              No activity yet
            </Typography>
            <form onSubmit={this.onSubmit}>
              <DatePicker
                label="Start"
                disableFuture={disableFuture}
                handleChangeTo={this.onStartChange}
                error={errors.start}
              />
              {errors.start && (
                <Typography color="error">{errors.start.msg}</Typography>
              )}

              <TextField
                label="Activity duration / days"
                name="duration"
                type="number"
                value={duration}
                onChange={this.onDurationChange}
                error={!!errors.duration ? true : false}
                fullWidth
              />
              {errors.duration && (
                <Typography color="error">{errors.duration.msg}</Typography>
              )}
              <Typography variant="caption">
                End : {!end ? '' : <Moment format="MMM Do YY">{end}</Moment>}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Create
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <Typography variant="h6" color="secondary" gutterBottom>
              Start:{' '}
              <Moment format="MMM Do YY">{activity.activity.start}</Moment>
            </Typography>
            <Typography variant="h6" color="secondary" gutterBottom>
              End: <Moment format="MMM Do YY">{activity.activity.end}</Moment>
            </Typography>
            <Typography variant="h6" color="secondary" gutterBottom>
              Participants: {activity.activity.participants}
            </Typography>
          </div>
        )}
        {errors.server && (
          <ErrorInfo
            variant="error"
            message={errors.server}
            onClose={this.onErrorClose}
          />
        )}
      </Paper>
    )
  }
}

InfoBoard.propTypes = {
  activity: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addActivity: PropTypes.func.isRequired,
  clearActivityError: PropTypes.func.isRequired
}

const mapStatetToProps = state => ({
  activity: state.activity,
  errors: state.activity.errors
})

export default connect(
  mapStatetToProps,
  { addActivity, clearActivityError }
)(withStyles(styles)(InfoBoard))
