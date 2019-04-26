import React, { Component } from 'react'
import Personal from './Personal'
import Team from './Team'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: 20
  },
  backBtn: {
    float: 'right',
    marginTop: 20
  }
})

class Contribution extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="flex-start"
        spacing={40}
      >
        <Grid item md={5}>
          <Personal />
        </Grid>
        <Grid item md={5}>
          <Team />
          <Button
            className={classes.backBtn}
            component={RouterLink}
            to="/user/home"
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Contribution.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Contribution)
