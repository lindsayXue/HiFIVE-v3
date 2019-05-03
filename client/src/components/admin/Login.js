import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import ErrorInfo from '../common/ErrorInfo'
import { adminLogin } from '../../actions/adminAuth'
import { clearErrors } from '../../actions/error'
import { Redirect } from 'react-router-dom'
import Logo from '../../assets/hifive.png'

const Login = ({
  isAuthenticated,
  isAdmin,
  adminLogin,
  errors,
  history,
  clearErrors
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
    clearErrors([e.target.name])
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
    clearErrors(['server'])
  }

  return (
    <Grid container justify="center" style={{ marginTop: '10rem' }}>
      <Grid item md={4} sm={8} xs={11} style={{ textAlign: 'center' }}>
        <Paper elevation={1} style={{ padding: '20px' }}>
          <img
            src={Logo}
            width="50"
            height="50"
            alt="Logo"
            style={{ marginBottom: '20px' }}
          />
          <Typography variant="h5" paragraph>
            <Typography inline component="span" variant="h5" color="primary">
              HiFIVE
            </Typography>{' '}
            Admin System
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
  adminLogin: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  isAdmin: state.adminAuth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { adminLogin, clearErrors }
)(withRouter(Login))
