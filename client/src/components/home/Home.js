import React, { Component } from 'react'
import Journey from './Journey'
import Contribution from './Contribution'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
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
          <Journey />
        </Grid>
        <Grid item md={4}>
          <Contribution />
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
