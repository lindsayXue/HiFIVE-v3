import React, { Component } from 'react'
import { getActivity } from '../../../actions/activity'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Grow } from '@material-ui/core'
import InfoBoard from './InfoBoard'
import Bonus from './Bonus'
import Post from './Post'
import Team from './Team'
import Footer from './Footer'
import PropTypes from 'prop-types'

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
      <Grid className={classes.root} container justify="center" spacing={16}>
        <Grid item lg={3} md={4} xs={11}>
          <Grow in timeout={1000}>
            <InfoBoard />
          </Grow>
          <Grow in timeout={1000}>
            <Footer />
          </Grow>
        </Grid>
        <Grid item lg={3} md={4} xs={11}>
          <Grow in timeout={1000}>
            <Bonus />
          </Grow>
        </Grid>
        <Grid item md={3} xs={11}>
          <Grow in timeout={1000}>
            <Post />
          </Grow>
        </Grid>
        <Grid item lg={9} xs={11}>
          <Grow in timeout={1000}>
            <Team />
          </Grow>
        </Grid>
      </Grid>
    )
  }
}

Activity.propTypes = {
  getActivity: PropTypes.func.isRequired
}

export default connect(
  null,
  { getActivity }
)(withStyles(styles)(Activity))
