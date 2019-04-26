import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    /* Set the fixed height of the footer here */
    height: '40px',
    backgroundColor: theme.palette.secondary.main
  }
})

const Footer = props => {
  const { classes } = props
  return (
    <Grid
      container
      className={classes.footer}
      component="footer"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography>
          Copyright &copy; {new Date().getFullYear()} HiFIVE
        </Typography>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(Footer)
