import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVEService'
import TablePaginationActionsWrapped from '../common/TablePaginationActions'
import EnhancedTableHead from '../common/EnhancedTableHead'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  LinearProgress
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    // width: '100%',
    padding: 20
  },
  table: {
    // maxWidth: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class HiFIVERank extends Component {
  state = {
    rank: [],
    order: 'desc',
    orderBy: 'hifive',
    page: 0,
    rowsPerPage: 5,
    isLoading: true,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getRank()
      this.setState({ rank: res.data, isLoading: false })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  handleChangePage = (e, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value })
  }
  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  render() {
    const { rank, rowsPerPage, page, order, orderBy, isLoading } = this.state
    const { classes } = this.props
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rank.length - page * rowsPerPage)

    const usersData = rank.map(user => {
      return {
        id: user._id,
        name: user.name,
        hifive: user.hifive
      }
    })

    const rows = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
      },
      { id: 'hifive', numeric: true, disablePadding: false, label: 'HiFIVE' }
    ]

    function desc(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1
      }
      if (b[orderBy] > a[orderBy]) {
        return 1
      }
      return 0
    }

    function stableSort(array, cmp) {
      const stabilizedThis = array.map((el, index) => [el, index])
      stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
      })
      return stabilizedThis.map(el => el[0])
    }

    function getSorting(order, orderBy) {
      return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy)
    }

    let rankBoard = (
      <Table className={classes.table}>
        <EnhancedTableHead
          rows={rows}
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
          rowCount={usersData.length}
        />
        <TableBody>
          {stableSort(usersData, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.hifive}</TableCell>
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
              count={usersData.length}
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
          Rank
        </Typography>
        <div className={classes.tableWrapper}>
          {isLoading && <LinearProgress color="primary" />}
          {!isLoading && rankBoard}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HiFIVERank)
