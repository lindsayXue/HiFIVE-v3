import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const Pagination = props => {
  const { classes, page, handleChangePage, maxPage } = props
  return (
    <div>
      <Button
        color="primary"
        className={classes.button}
        disabled={page === 0}
        onClick={e => handleChangePage(e, page - 1)}
      >
        <i className="fas fa-arrow-circle-left fa-2x" />
      </Button>
      <Button
        color="primary"
        className={classes.button}
        disabled={maxPage === 0 || page === maxPage - 1}
        onClick={e => handleChangePage(e, page + 1)}
      >
        <i className="fas fa-arrow-circle-right fa-2x" />
      </Button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired
}

export default withStyles(styles)(Pagination)
