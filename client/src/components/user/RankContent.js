import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper } from '@material-ui/core'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  }
})

const RankContent = props => {
  const { classes, title, rank } = props

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h6" component="h3" color="primary">
        {title}
      </Typography>
      <Typography component="p">
        <i className="fas fa-star" /> {rank}
      </Typography>
    </Paper>
  )
}

RankContent.propTypes = {
  title: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RankContent)
