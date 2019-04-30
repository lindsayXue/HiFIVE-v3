import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { GoogleLogin } from 'react-google-login'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import googleLogo from '../../assets/google-logo.png'
import ErrorInfo from '../common/ErrorInfo'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  content: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit,
    width: '100%',
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
    error: null,
    isLoading: false
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/user/home" />
    }
  }

  onSuccessSignin = response => {
    let id_token = response.getAuthResponse().id_token
    this.setState({ isLoading: true })
    this.props.login(id_token, this.props.history)
  }

  onFailSignin = response => {
    this.setState({ error: response.error })
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  render() {
    const { classes } = this.props
    const { error, isLoading } = this.state

    return (
      <Grid container justify="center" style={{ marginTop: '10rem' }}>
        <Grid item md={3} sm={5} className={classes.content}>
          {isLoading && (
            <CircularProgress className={classes.progress} color="primary" />
          )}
          {!isLoading && (
            <GoogleLogin
              clientId="909776054271-l3v0sar1i5nqir67jjo0pn9bv252f9i1.apps.googleusercontent.com"
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
          {error && (
            <ErrorInfo
              variant="error"
              message="Oops!Something wrong with google!"
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
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { login }
)(withStyles(styles)(Login))
