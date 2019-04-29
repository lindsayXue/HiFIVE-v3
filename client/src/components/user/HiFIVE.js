import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVEService'
import PropTypes from 'prop-types'
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Pagination from '../common/Pagination'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: '20px'
  }
})

class HiFIVE extends Component {
  state = {
    hifives: [],
    page: 0,
    rowsPerPage: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getUserHiFIVE()
      this.setState({
        hifives: res.data
      })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  render() {
    const { classes, style } = this.props
    const { hifives, rowsPerPage, page } = this.state

    // const emptyRows =
    //   rowsPerPage - Math.min(rowsPerPage, members.length - page * rowsPerPage)

    let maxPage = Math.ceil(hifives.length / rowsPerPage)

    return (
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h5" color="primary" gutterBottom>
          Guess who gived you a HiFIVE
        </Typography>
        <div className={classes.demo}>
          <List>
            {hifives.length === 0 && (
              <ListItem>
                <ListItemText secondary="No one gived you a HiFIVE yet" />
              </ListItem>
            )}
            {hifives
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(hi => (
                <ListItem key={hi._id}>
                  <ListItemText primary={hi.sender.name} />
                  <ListItemText secondary={hi.reason} />
                </ListItem>
              ))}
          </List>
          <Pagination
            page={page}
            handleChangePage={this.handleChangePage}
            maxPage={maxPage}
          />
        </div>
      </Paper>
    )
  }
}

HiFIVE.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HiFIVE)
