import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Footer = () => {
  return (
    <Grid container justify="center" alignItems="center" className="footer">
      <Grid item>
        <Typography>
          Copyright &copy; {new Date().getFullYear()} HiFIVE
        </Typography>
      </Grid>
    </Grid>
  )
}
export default Footer
