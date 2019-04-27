import React, { Component } from 'react'
import UserService from '../../services/user/UserService'
import { Link as RouterLink } from 'react-router-dom'
import { addHiFIVE } from '../../actions/hifiveAction'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import AutoComplete from '../common/AutoComplete'

class AddHiFIVE extends Component {
  state = {
    receiver: '',
    reason: '',
    receiverOptions: [],
    error: null
  }

  async componentDidMount() {
    try {
      const res = await UserService.getUsers()
      this.setState({
        receiverOptions: res.data.filter(
          e => e._id !== this.props.auth.user._id
        )
      })
    } catch (err) {
      this.setState({ error: err.reponse.data })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onAutoComleteChange = name => value => {
    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const receiverArray = this.state.receiver.map(e => e.value)

    const newHiFIVE = {
      sender: this.props.auth.user._id,
      receiver: receiverArray,
      reason: this.state.reason
    }
    console.log(newHiFIVE)

    this.props.addHiFIVE(newHiFIVE, this.props.history)
  }

  render() {
    const { receiver, reason, receiverOptions } = this.state
    const { errors } = this.props

    return (
      <Grid container justify="center" style={{ marginTop: '20px' }}>
        <Grid item lg={4} md={5}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography
              variant="h5"
              component="h3"
              color="primary"
              style={{ marginBottom: '10px' }}
            >
              Give a HiFIVE
              <Button
                component={RouterLink}
                to="/user/home"
                variant="contained"
                color="primary"
                style={{ float: 'right' }}
              >
                Back
              </Button>
            </Typography>
            <form onSubmit={this.onSubmit}>
              <AutoComplete
                name="receiver"
                onChange={this.onAutoComleteChange}
                receiverOptions={receiverOptions}
                value={receiver}
                isMulti="true"
              />
              {errors.receiver && (
                <Typography color="error">{errors.receiver}</Typography>
              )}

              <TextField
                placeholder="Reason"
                label="Reason"
                name="reason"
                value={reason}
                onChange={this.onChange}
                error={!!errors.reason ? true : false}
                fullWidth
              />
              {errors.reason && (
                <Typography color="error">{errors.reason}</Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Submit
              </Button>
            </form>
            {!!errors.unregisteruser || errors.servererror ? (
              <div className="alert alert-danger" role="alert">
                {errors.unregisteruser || errors.servererror}
              </div>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AddHiFIVE.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addHiFIVE }
)(withRouter(AddHiFIVE))
