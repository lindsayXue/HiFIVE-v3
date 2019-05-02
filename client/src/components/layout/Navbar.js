import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import Logo from '../../assets/hifive.png'
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AdminNavbar from './AdminNavbar'
import UserNavbar from './UserNavbar'

const styles = {
  root: {
    flexGrow: 1
  },
  navTitle: {
    marginRight: 20,
    marginLeft: 10
  }
}

const Navbar = ({ classes, isAuthenticated, isAdmin }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Link
            component={RouterLink}
            to={isAdmin ? '/admin' : '/'}
            color="inherit"
          >
            <img src={Logo} width="40" height="40" alt="Logo" />
          </Link>
          <Typography className={classes.navTitle} variant="h6" color="inherit">
            {isAdmin ? 'HiFIVE Admin system' : 'HiFIVE'}
          </Typography>
          {isAuthenticated && <UserNavbar />}
          {isAdmin && <AdminNavbar />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.adminAuth.isAdmin
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Navbar)))
