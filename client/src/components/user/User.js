import React, { Component } from 'react'
import Record from './Record'
import Rank from './Rank'
import Member from './Member'
import { Grid, Grow } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import HiFIVE from './HiFIVE'

const styles = {
  root: {
    marginTop: 20
  }
}

class User extends Component {
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
          <Grow in timeout={1000}>
            <Record />
          </Grow>
        </Grid>
        <Grid item md={4}>
          <Grow in timeout={1000}>
            <Rank />
          </Grow>
          <Grow in timeout={1000}>
            <Member />
          </Grow>
          <Grow in timeout={1000}>
            <HiFIVE />
          </Grow>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(User)
