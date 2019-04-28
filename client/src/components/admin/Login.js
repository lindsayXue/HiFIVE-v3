import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authAction'
import PropTypes from 'prop-types'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ErrorInfo from '../common/ErrorInfo'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  componentDidMount() {
    if (this.props.auth.isAdmin) {
      this.props.history.push('/admin/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAdmin) {
      this.props.history.push('/admin/home')
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const adminLogin = {
      username: this.state.username,
      password: this.state.password
    }

    console.log(adminLogin)
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login))
