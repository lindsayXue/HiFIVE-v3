import React, { Component } from 'react'
import Journey from './Journey'
import Contribution from './Contribution'
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
        <Grid item md={5}>
          <Journey />
        </Grid>
        <Grid item md={5}>
          <Contribution />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home)
