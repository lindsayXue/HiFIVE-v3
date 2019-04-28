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
  TablePagination,
  LinearProgress
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
    isLoading: true,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getHistory()
      this.setState({ history: res.data, isLoading: false })
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
    const { history, page, rowsPerPage, isLoading } = this.state
    const { classes } = this.props

    const historyTable = history.map(e => ({
      ...e,
      receiver: e.receiver.map(i => i.name).join()
    }))

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, historyTable.length - page * rowsPerPage)

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
          {historyTable.length === 0 && (
            <TableRow color="secondary">
              <TableCell>No one get HiFIVE yet</TableCell>
            </TableRow>
          )}
          {historyTable
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((his, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {his.sender.name}
                </TableCell>
                <TableCell>{his.receiver}</TableCell>
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
        <Typography variant="h5" component="h3" gutterBottom>
          History
        </Typography>
        {isLoading && <LinearProgress color="primary" />}
        {!isLoading && <List>{historyBoard}</List>}
      </div>
    )
  }
}

HiFIVEHis.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HiFIVEHis)
