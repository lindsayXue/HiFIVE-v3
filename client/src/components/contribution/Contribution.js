import React, { Component } from 'react'
import Personal from './Personal'
import Team from './Team'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, Button, Grow } from '@material-ui/core'
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
        spacing={16}
      >
        <Grid item lg={4} md={5} xs={11}>
          <Grow in timeout={1000}>
            <Personal />
          </Grow>
        </Grid>
        <Grid item lg={4} md={5} xs={11}>
          <Grow in timeout={1000}>
            <Team />
          </Grow>

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
