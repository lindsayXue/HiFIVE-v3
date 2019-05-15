import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import googleLogo from '../../assets/google-logo.png'
import ErrorInfo from '../common/ErrorInfo'
import Logo from '../../assets/hifive.png'
import queryString from 'query-string'

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
    error: null,
    signinLoading: false
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      return this.props.history.push('/user/home')
    }
    if (this.props.isAdmin) {
      return this.props.history.push('admin/activity')
    }

    const query = queryString.parse(this.props.location.search)
    if (query.error) {
      this.setState({ error: query.error })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      return this.props.history.push('/user/home')
    }
    if (nextProps.isAdmin) {
      return this.props.history.push('admin/activity')
    }
  }

  onLoginClick = e => {
    this.setState({ signinLoading: true })
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }
  render() {
    const { classes } = this.props
    const { error, signinLoading } = this.state
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
          {!signinLoading && (
            <Button
              component="a"
              href="http://localhost:5000/api/auth/google"
              variant="outlined"
              color="primary"
              onClick={this.onLoginClick}
            >
              {' '}
              <img
                src={googleLogo}
                className={classes.googleLogo}
                alt="Google Logo"
              />
              Signin with Google
            </Button>
          )}
          {error && (
            <ErrorInfo
              variant="error"
              message={error}
              onClose={this.onErrorClose}
            />
          )}
        </Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.adminAuth.isAdmin
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Login)))
