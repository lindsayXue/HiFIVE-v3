import React from 'react'
import { SnackbarContent, IconButton } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  // success: {
  //   backgroundColor: green[600],
  // },
  error: {
    backgroundColor: theme.palette.error.dark,
    margin: '20px'
  },
  // info: {
  //   backgroundColor: theme.palette.primary.dark,
  // },
  // warning: {
  //   backgroundColor: amber[700],
  // },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
})

const ErrorInfo = props => {
  const { classes, className, message, onClose, variant, ...other } = props
  const Icon = ErrorIcon

  return (
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classes.iconVariant} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

export default withStyles(styles)(ErrorInfo)
