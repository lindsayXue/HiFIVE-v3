import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 200,
    textAlign: 'center',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.light
  }
})

const Userinfo = ({ classes, user, flagStyle }) => {
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography component="p" variant="subtitle1" gutterBottom>
          <i className="fas fa-user" /> <span>{user.name}</span>
          {'   '}
          <i className="fas fa-flag" style={flagStyle} />
        </Typography>
        <Typography component="p" variant="subtitle1" gutterBottom>
          Points: {user.points} <i className="fas fa-hand-paper" />
          {'   '}
          {user.hifive}
        </Typography>
        {!user.accountState && (
          <Typography color="error" variant="caption">
            Your account has been paused, Please contact administrator!
          </Typography>
        )}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Userinfo)
