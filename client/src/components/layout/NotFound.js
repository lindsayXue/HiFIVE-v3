import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Grid container justify="center" style={{ marginTop: '5rem' }}>
      <Grid item>
        <Typography variant="h3" paragraph color="primary">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </Typography>
        <Typography paragraph variant="h5">
          Sorry, this page does not exist
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotFound
