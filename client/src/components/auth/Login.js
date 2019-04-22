import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authAction'
import TextFieldGroup from '../common/TextFieldGroup'
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    googleToken: '',
    inputError: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    if (!this.state.googleToken) {
      this.setState({ inputError: 'Required' })
      return
    }

    this.props.loginUser(
      { googleToken: this.state.googleToken },
      this.props.history
    )
  }

  render() {
    const { errors } = this.props
    const { googleToken, inputError } = this.state

    return (
      <div className="login my-4 mx-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-left text-info">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="googleToken"
                  placeHolder="Google Token"
                  value={googleToken}
                  onChange={this.onChange}
                  error={inputError}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              {!!errors.unregisteruser || errors.servererror ? (
                <div className="alert alert-danger" role="alert">
                  {errors.unregisteruser || errors.servererror}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
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
