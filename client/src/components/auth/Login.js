import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authAction'
import PropTypes from 'prop-types'
import { GoogleLogin } from 'react-google-login'
import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import googleLogo from '../../assets/google-logo.png'
import ErrorInfo from '../common/ErrorInfo'

const styles = theme => ({
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
  }
})

class Login extends Component {
  state = {
    error: null
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/user/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/user/home')
    }
  }

  onSuccessSignin = response => {
    let id_token = response.getAuthResponse().id_token

    this.props.loginUser(id_token, this.props.history)
  }

  onFailSignin = response => {
    this.setState({ error: response.error })
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  render() {
    const { classes } = this.props
    const { error } = this.state
    return (
      <Grid container justify="center" style={{ marginTop: '10rem' }}>
        <Grid item md={3} sm={5}>
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
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login))
