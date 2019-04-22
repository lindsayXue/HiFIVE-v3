import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authAction'
import TextFieldGroup from '../common/TextFieldGroup'
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    googleId: '',
    errors: {}
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    this.props.loginUser(this.state.googleId, this.props.history)
  }

  render() {
    const { googleId, errors } = this.state
    return (
      <div className="login my-4 mx-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-left text-info">Log In</h1>
              <p className="lead text-left text-muted">
                Sign in with your Google account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Google ID"
                  name="googleId"
                  value={googleId}
                  onChange={this.onChange}
                  error={errors.googleId}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
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

// const mapStateToProps = state => {
//   auth: state.auth
// }

export default connect(
  null,
  { loginUser }
)(Login)
