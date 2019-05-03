import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Grow } from '@material-ui/core'
import RecordHistory from './RecordHistory'
import HiFIVEHistory from './HiFIVEHistory'
import UserList from './UserList'

const styles = theme => ({
  root: {
    marginTop: 20
  }
})

class User extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid className={classes.root} container justify="center" spacing={16}>
        <Grid item lg={6} xs={11}>
          <Grow in timeout={1000}>
            <RecordHistory />
          </Grow>
        </Grid>
        <Grid item lg={5} xs={11}>
          <Grow in timeout={1000}>
            <HiFIVEHistory />
          </Grow>
        </Grid>
        <Grid item xs={11}>
          <Grow in timeout={1000}>
            <UserList />
          </Grow>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  null,
  {}
)(withStyles(styles)(User))
