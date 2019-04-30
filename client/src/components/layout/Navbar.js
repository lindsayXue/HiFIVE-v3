import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Logo from '../../assets/hifive.png'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
  Drawer,
  MenuList,
  MenuItem,
  Hidden
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1
  },
  pageNav: {
    flexGrow: 1,
    display: 'flex'
  },
  pageNavItem: {
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navTitle: {
    marginRight: 20,
    marginLeft: 10
  }
}

class Navbar extends Component {
  state = {
    navDrawers: false,
    adminDrawers: false
  }
  onLogoutClick = e => {
    e.preventDefault()

    this.props.logoutUser()
  }

  toggleUserDrawer = open => () => {
    this.setState({
      navDrawers: open
    })
  }

  // toggleAdminDrawer = open => () => {
  //   this.setState({
  //     adminDrawers: open
  //   })
  // }

  // onAdminLogoutClick = e => {
  //   e.preventDefault()

  //   this.props.logoutAdmin()
  // }

  render() {
    const { isAuthenticated } = this.props.auth

    const {
      classes,
      location: { pathname }
    } = this.props
    const { navDrawers } = this.state

    const authLinks = (
      <Hidden smDown>
        <MenuList className={classes.pageNav}>
          <MenuItem
            className={classes.pageNavItem}
            component={RouterLink}
            to="/user/home"
            selected={'/user/home' === pathname}
          >
            Home
          </MenuItem>
          <MenuItem
            className={classes.pageNavItem}
            component={RouterLink}
            to="/user/profile"
            selected={'/user/profile' === pathname}
          >
            User
          </MenuItem>
        </MenuList>
      </Hidden>
    )
    const logoutLink = (
      <Button
        className={classes.link}
        color="inherit"
        onClick={this.onLogoutClick}
      >
        Logout
      </Button>
    )
    const authLinksMobile = (
      <div>
        <MenuList>
          <MenuItem
            component={RouterLink}
            to="/user/home"
            selected={'/user/home' === pathname}
          >
            Home
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/user/profile"
            selected={'/user/profile' === pathname}
          >
            User
          </MenuItem>
        </MenuList>
      </div>
    )
    // const adminLinks = (
    //   <Hidden smDown>
    //     <MenuList className={classes.pageNav}>
    //       <MenuItem
    //         className={classes.pageNavItem}
    //         component={RouterLink}
    //         to="/admin/activity"
    //         selected={'/admin/activity' === pathname}
    //       >
    //         Activity
    //       </MenuItem>
    //       <MenuItem
    //         className={classes.pageNavItem}
    //         component={RouterLink}
    //         to="/admin/users"
    //         selected={'/admin/users' === pathname}
    //       >
    //         Users
    //       </MenuItem>
    //     </MenuList>
    //   </Hidden>
    // )

    // const adminLinksMobile = (
    //   <div>
    //     <MenuList>
    //       <MenuItem
    //         component={RouterLink}
    //         to="/admin/activity"
    //         selected={'/admin/activity' === pathname}
    //       >
    //         Activity
    //       </MenuItem>
    //       <MenuItem
    //         component={RouterLink}
    //         to="/admin/users"
    //         selected={'/admin/users' === pathname}
    //       >
    //         Users
    //       </MenuItem>
    //     </MenuList>
    //   </div>
    // )

    // const adminLogout = (
    //   <Button
    //     className={classes.link}
    //     color="inherit"
    //     onClick={this.onAdminLogoutClick}
    //   >
    //     Logout
    //   </Button>
    // )
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            {isAuthenticated && (
              <Hidden smUp>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleUserDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            )}
            {/* {isAdmin && (
              <Hidden smUp>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleAdminDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            )} */}
            <Drawer
              anchor="top"
              open={navDrawers}
              onClose={this.toggleUserDrawer(false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleUserDrawer(false)}
                onKeyDown={this.toggleUserDrawer(false)}
              >
                {authLinksMobile}
              </div>
            </Drawer>
            {/* <Drawer
              anchor="top"
              open={adminDrawers}
              onClose={this.toggleAdminDrawer(false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleAdminDrawer(false)}
                onKeyDown={this.toggleAdminDrawer(false)}
              >
                {adminLinksMobile}
              </div>
            </Drawer> */}
            <Link component={RouterLink} to="/user/home" color="inherit">
              <img src={Logo} width="40" height="40" alt="Logo" />
            </Link>
            <Typography
              className={classes.navTitle}
              variant="h6"
              color="inherit"
            >
              HiFIVE
            </Typography>
            {isAuthenticated && authLinks}
            {isAuthenticated && logoutLink}
            {/* {isAdmin && adminLinks}
            {isAdmin && adminLogout} */}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth // admin: state.admin
})

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(withStyles(styles)(Navbar)))
