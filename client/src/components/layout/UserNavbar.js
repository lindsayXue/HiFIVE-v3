import React, { Component, Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Button,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  Hidden
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  pageNav: {
    flexGrow: 1,
    display: 'flex'
  },
  pageNavItem: {
    color: 'white'
  },
  menuButton: {},
  logoutBtnMobile: {
    width: '100%'
  }
}

class UserNavbar extends Component {
  state = {
    navDrawers: false
  }
  onLogoutClick = e => {
    e.preventDefault()

    this.props.logout()
  }

  toggleUserDrawer = open => () => {
    this.setState({
      navDrawers: open
    })
  }

  render() {
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
      <Hidden smDown>
        <Button color="inherit" onClick={this.onLogoutClick}>
          Logout
        </Button>
      </Hidden>
    )
    const authLinksMobile = (
      <Fragment>
        <MenuList className={classes.pageNavMobile}>
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
          <MenuItem
            component="button"
            onClick={this.onLogoutClick}
            className={classes.logoutBtnMobile}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Fragment>
    )
    return (
      <Fragment>
        <Hidden mdUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.toggleUserDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

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
        {authLinks}
        {logoutLink}
      </Fragment>
    )
  }
}

UserNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(
  null,
  { logout }
)(withRouter(withStyles(styles)(UserNavbar)))
