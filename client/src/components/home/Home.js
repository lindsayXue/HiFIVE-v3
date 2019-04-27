import React, { Component } from 'react'
import Journey from './Journey'
import Contribution from './Contribution'
import HiFIVE from './HiFIVE'
import PropTypes from 'prop-types'
import { Grid, Grow } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: 20
  }
})

class Home extends Component {
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
        <Grid item lg={4} md={5}>
          <Grow in timeout={1000}>
            <Journey />
          </Grow>
        </Grid>
        <Grid item md={4}>
          <Grow in timeout={1000}>
            <Contribution />
          </Grow>
        </Grid>
        <Grid item lg={8} md={9}>
          <Grow in timeout={1000}>
            <HiFIVE />
          </Grow>
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
