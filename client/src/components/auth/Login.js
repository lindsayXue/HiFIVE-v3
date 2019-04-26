import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authAction'
import PropTypes from 'prop-types'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'

class Login extends Component {
  state = {
    googleToken: '',
    inputError: false
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/user/home')
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    if (!this.state.googleToken) {
      this.setState({ inputError: true })
      return
    }

    this.props.loginUser(
      { googleToken: this.state.googleToken },
      this.props.history
    )
  }

  render() {
    const { errors } = this.props
    const { googleToken } = this.state

    return (
      <Grid container justify="center" style={{ marginTop: '20px' }}>
        <Grid item md={5}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography variant="h5" component="h3" color="primary">
              Login
            </Typography>
            <form onSubmit={this.onSubmit}>
              <TextField
                name="googleToken"
                label="Google Id"
                value={googleToken}
                onChange={this.onChange}
                required
                fullWidth
              />
              {/* <input type="submit" className="btn btn-default btn-block mt-4" /> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)
