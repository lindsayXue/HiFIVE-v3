import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AdminRoute = ({ component: Component, adminAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      adminAuth.isAdmin === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin" />
      )
    }
  />
)

AdminRoute.propTypes = {
  adminAuth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  adminAuth: state.adminAuth
})

export default connect(mapStateToProps)(AdminRoute)
