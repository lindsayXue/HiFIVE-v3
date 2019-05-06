import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { GoogleLogin } from 'react-google-login'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import googleLogo from '../../assets/google-logo.png'
import ErrorInfo from '../common/ErrorInfo'
import { setErrors, clearErrors } from '../../actions/error'
import Logo from '../../assets/hifive.png'

const config = require('../../config/config')
const googleClientId = config.google.clientId

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  content: {
    textAlign: 'center'
  },
  logo: {
    marginBottom: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit * 2,
    height: '50px',
    fontSize: '1rem'
  },
  input: {
    display: 'none'
  },
  googleLogo: {
    maxWidth: '100%',
    height: '30px',
    marginRight: '10px'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class Login extends Component {
  state = {
    signinLoading: false
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/user/home')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      console.log('redirect')
      this.props.history.push('/user/home')
    }
  }

  onSuccessSignin = response => {
    this.setState({ signinLoading: true })
    let id_token = response.getAuthResponse().id_token
    this.props.login(id_token, this.props.history).then(() => {
      this.setState({ signinLoading: false })
    })
  }

  onFailSignin = response => {
    console.log(response)
    this.props.setErrors({
      googleServer: {
        msg: 'Something wrong with Google Signin'
      }
    })
  }

  onErrorClose = () => {
    this.props.clearErrors(['googleServer'])
  }
  render() {
    const { classes, errors } = this.props
    const { signinLoading } = this.state
    return (
      <Grid container justify="center" style={{ marginTop: '10rem' }}>
        <Grid item md={4} sm={8} xs={12} className={classes.content}>
          <img
            className={classes.logo}
            src={Logo}
            width="50"
            height="50"
            alt="Logo"
          />
          <Typography variant="h5" paragraph>
            Welcome to{' '}
            <Typography inline component="span" variant="h5" color="primary">
              HiFIVE
            </Typography>{' '}
            Community
          </Typography>
          {signinLoading && (
            <CircularProgress className={classes.progress} color="primary" />
          )}
          {/* <a href="http://localhost:5000/api/auth/google" target="_blank">
          <Button variant="outlined" color="primary">
            {' '}
            <img
              src={googleLogo}
              className={classes.googleLogo}
              alt="Google Logo"
            />
            Signin with Google
          </Button>
        </a> */}

          {!signinLoading && (
            <GoogleLogin
              clientId={googleClientId}
              render={renderProps => (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src={googleLogo}
                    className={classes.googleLogo}
                    alt="Google Logo"
                  />
                  Signin with Google
                </Button>
              )}
              buttonText="Signin with Google"
              onSuccess={this.onSuccessSignin}
              onFailure={this.onFailSignin}
              cookiePolicy={'single_host_origin'}
            />
          )}
          {errors.googleServer && (
            <ErrorInfo
              variant="error"
              message={errors.googleServer.msg}
              onClose={this.onErrorClose}
            />
          )}
        </Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.adminAuth.isAdmin,
  errors: state.errors
})

export default withRouter(
  connect(
    mapStateToProps,
    { login, setErrors, clearErrors }
  )(withStyles(styles)(Login))
)
