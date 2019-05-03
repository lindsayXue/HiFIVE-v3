import React, { Component, Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminLogout } from '../../actions/adminAuth'
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

class AdminNavbar extends Component {
  state = {
    adminDrawers: false
  }

  toggleAdminDrawer = open => () => {
    this.setState({
      adminDrawers: open
    })
  }

  onAdminLogoutClick = e => {
    e.preventDefault()

    this.props.adminLogout()
  }

  render() {
    const {
      classes,
      location: { pathname }
    } = this.props
    const { adminDrawers } = this.state

    const adminLinks = (
      <Hidden smDown>
        <MenuList className={classes.pageNav}>
          <MenuItem
            className={classes.pageNavItem}
            component={RouterLink}
            to="/admin/activity"
            selected={'/admin/activity' === pathname}
          >
            Activity
          </MenuItem>
          <MenuItem
            className={classes.pageNavItem}
            component={RouterLink}
            to="/admin/users"
            selected={'/admin/users' === pathname}
          >
            Users
          </MenuItem>
        </MenuList>
      </Hidden>
    )

    const adminLinksMobile = (
      <div>
        <MenuList>
          <MenuItem
            component={RouterLink}
            to="/admin/activity"
            selected={'/admin/activity' === pathname}
          >
            Activity
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/admin/users"
            selected={'/admin/users' === pathname}
          >
            Users
          </MenuItem>
          <MenuItem
            component="button"
            onClick={this.onAdminLogoutClick}
            className={classes.logoutBtnMobile}
          >
            Logout
          </MenuItem>
        </MenuList>
      </div>
    )

    const adminLogout = (
      <Hidden smDown>
        <Button
          className={classes.link}
          color="inherit"
          onClick={this.onAdminLogoutClick}
        >
          Logout
        </Button>
      </Hidden>
    )
    return (
      <Fragment>
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

        <Drawer
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
        </Drawer>
        {adminLinks}
        {adminLogout}
      </Fragment>
    )
  }
}

AdminNavbar.propTypes = {
  adminLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(
  null,
  { adminLogout }
)(withRouter(withStyles(styles)(AdminNavbar)))
