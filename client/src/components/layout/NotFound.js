import React, { Fragment } from 'react'
import { Typography, Grid } from '@material-ui/core'

const NotFound = () => {
  return (
    <Grid container justify="center" style={{ marginTop: '5rem' }}>
      <Grid item>
        <Typography variant="h3" paragraph color="primary">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </Typography>
        <Typography variant="h5">Sorry, this page does not exist</Typography>
      </Grid>
    </Grid>
  )
}

export default NotFound
