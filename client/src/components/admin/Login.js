import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import ErrorInfo from '../common/ErrorInfo'
import { adminLogin } from '../../actions/adminAuth'
import { clearError } from '../../actions/error'
import { Redirect } from 'react-router-dom'

const Login = ({
  isAuthenticated,
  isAdmin,
  adminLogin,
  errors,
  history,
  clearError
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  if (isAuthenticated) {
    return <Redirect to="/user/home" />
  }

  if (isAdmin) {
    return <Redirect to="/admin/activity" />
  }

  const onChange = e => {
    clearError([e.target.name])
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()

    const loginData = {
      username,
      password
    }

    adminLogin(loginData, history)
  }

  const onErrorClose = () => {
    clearError('server')
  }

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
          <form onSubmit={onSubmit}>
            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={e => onChange(e)}
              error={!!errors.username ? true : false}
              fullWidth
            />
            {errors.username && (
              <Typography color="error">{errors.username.msg}</Typography>
            )}
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => onChange(e)}
              error={!!errors.password ? true : false}
              fullWidth
            />
            {errors.password && (
              <Typography color="error">{errors.password.msg}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
            {errors.server && (
              <ErrorInfo
                variant="error"
                message={errors.server.msg}
                onClose={onErrorClose}
              />
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

Login.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  adminLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  isAdmin: state.adminAuth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { adminLogin, clearError }
)(withRouter(Login))
