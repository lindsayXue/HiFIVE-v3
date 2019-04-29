import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { loginAdmin } from '../../actions/adminAction'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import ErrorInfo from '../common/ErrorInfo'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  componentDidMount() {
    if (this.props.admin.isAdmin) {
      this.props.history.push('/admin/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin.isAdmin) {
      this.props.history.push('/admin/home')
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const loginData = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.loginAdmin(loginData, this.props.history)
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  render() {
    const { errors } = this.props
    const { error, username, password } = this.state
    return (
      <Grid container justify="center" style={{ marginTop: '10rem' }}>
        <Grid item md={3} sm={5}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography
              variant="h5"
              component="h3"
              color="primary"
              style={{ marginBottom: '10px' }}
            >
              Admin
            </Typography>
            <form onSubmit={this.onSubmit}>
              <TextField
                label="Username"
                name="username"
                value={username}
                onChange={this.onChange}
                error={!!errors.username ? true : false}
                fullWidth
              />
              {errors.username && (
                <Typography color="error">{errors.username}</Typography>
              )}
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.onChange}
                error={!!errors.password ? true : false}
                fullWidth
              />
              {errors.password && (
                <Typography color="error">{errors.password}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Login
              </Button>
              {error && (
                <ErrorInfo
                  variant="error"
                  message="Oops!Something wrong with google!"
                  onClose={this.onErrorClose}
                />
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginAdmin }
)(withRouter(Login))
