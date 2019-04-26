import React, { Component } from 'react'
import Record from './Record'
import Rank from './Rank'
import Member from './Member'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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
          <Record />
        </Grid>
        <Grid item md={4}>
          <Rank />
          <Member />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(User)
