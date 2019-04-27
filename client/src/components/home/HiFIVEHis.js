import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HiFIVEService from '../../services/user/HiFIVEService'
import {
  Typography,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from '@material-ui/core'
import TablePaginationActionsWrapped from '../common/TablePaginationActions'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class HiFIVEHis extends Component {
  state = {
    history: [],
    page: 0,
    rowsPerPage: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getHistory()
      this.setState({ history: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value })
  }

  render() {
    const { history, page, rowsPerPage } = this.state
    const { classes } = this.props
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, history.length - page * rowsPerPage)

    let historyBoard = (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell>Receiver</TableCell>
            <TableCell align="right">Reason</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {history.length === 0 && (
            <TableRow color="secondary">
              <TableCell>No record yet</TableCell>
            </TableRow>
          )}
          {history
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(his => (
              <TableRow key={his._id}>
                <TableCell component="th" scope="row">
                  {his.sender.name}
                </TableCell>
                <TableCell>{his.receiver.name}</TableCell>
                <TableCell align="right">{his.reason}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 48 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActionsWrapped}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )

    return (
      <div>
        <Typography component="h2" variant="h6">
          History
        </Typography>
        <List>{historyBoard}</List>
      </div>
    )
  }
}

HiFIVEHis.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HiFIVEHis)
