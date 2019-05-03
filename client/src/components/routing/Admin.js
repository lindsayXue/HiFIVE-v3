import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import AdminLogin from '../admin/Login'
import AdminActivity from '../admin/Activity/Activity'
import AdminUser from '../admin/Users/User'
import AdminRoute from './AdminRoute'

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/admin" component={AdminLogin} />
      <AdminRoute exact path="/admin/activity" component={AdminActivity} />
      <AdminRoute exact path="/admin/users" component={AdminUser} />
    </Fragment>
  )
}

export default Routes
