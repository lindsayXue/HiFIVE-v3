import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authAction'
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
    marginRight: 20
  }
}

class Navbar extends Component {
  state = {
    navDrawers: false
  }
  onLogoutClick = e => {
    e.preventDefault()

    this.props.logoutUser()
  }

  toggleDrawer = open => () => {
    this.setState({
      navDrawers: open
    })
  }

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
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            )}
            <Drawer
              anchor="top"
              open={navDrawers}
              onClose={this.toggleDrawer(false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                {authLinksMobile}
              </div>
            </Drawer>
            <Link component={RouterLink} to="/" color="inherit">
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
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(withStyles(styles)(Navbar)))
