import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, Button, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import HiFIVEHis from './HiFIVEHis'
import HiFIVERank from './HiFIVERank'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 'auto'
  },
  backBtn: {
    float: 'right'
  }
})

class HiFIVE extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={2}>
        <Typography variant="h5" color="primary" paragraph>
          HiFIVE
          <Button
            className={classes.backBtn}
            component={RouterLink}
            to="/user/hifive/add"
            variant="contained"
            color="primary"
          >
            Give a HiFIVE
          </Button>
        </Typography>
        <hr />
        <Grid container spacing={40}>
          <Grid item md={7}>
            <HiFIVEHis />
          </Grid>
          <Grid item md={5}>
            <HiFIVERank />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

HiFIVE.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HiFIVE)
