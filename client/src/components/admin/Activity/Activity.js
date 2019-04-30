import React, { Component } from 'react'
import { getActivity } from '../../../actions/activity'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Grow } from '@material-ui/core'
import InfoBoard from './InfoBoard'
import Bonus from './Bonus'
import Users from './Users'

const styles = theme => ({
  root: {
    marginTop: 20
  }
})

class Activity extends Component {
  componentDidMount() {
    this.props.getActivity()
  }

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
            <InfoBoard />
          </Grow>
          <Grow in timeout={1000}>
            <Bonus />
          </Grow>
        </Grid>
        <Grid item lg={7} md={9}>
          <Grow in timeout={1000}>
            <Users />
          </Grow>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  null,
  { getActivity }
)(withStyles(styles)(Activity))
