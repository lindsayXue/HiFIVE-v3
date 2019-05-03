import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Footer from '../layout/Footer'
import Banner from '../banner/Banner'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Home from '../home/Home'
import User from '../user/User'
import Post from '../post/Post'
import Contribution from '../contribution/Contribution'
import AddRecord from '../record/AddRecord'
import AddHiFIVE from '../hifive/AddHiFIVE'
import AdminLogin from '../admin/Login'
import AdminActivity from '../admin/Activity/Activity'
import AdminUser from '../admin/Users/User'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/user" component={Banner} />
      <PrivateRoute exact path="/user/home" component={Home} />
      <PrivateRoute exact path="/user/profile" component={User} />
      <PrivateRoute exact path="/user/posts" component={Post} />
      <PrivateRoute exact path="/user/contribution" component={Contribution} />
      <PrivateRoute exact path="/user/record/add" component={AddRecord} />
      <PrivateRoute exact path="/user/hifive/add" component={AddHiFIVE} />
      <Route exact path="/admin" component={AdminLogin} />
      <AdminRoute exact path="/admin/activity" component={AdminActivity} />
      <AdminRoute exact path="/admin/users" component={AdminUser} />
      <Footer />
    </Fragment>
  )
}

export default Routes
