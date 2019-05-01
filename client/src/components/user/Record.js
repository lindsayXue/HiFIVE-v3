import React, { Component } from 'react'
import RecordService from '../../services/user/Record'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import {
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
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
  },
  backBtn: {
    float: 'right'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class Record extends Component {
  state = {
    records: [],
    page: 0,
    rowsPerPage: 5,
    isLoading: true,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await RecordService.getUserRecord({
        googleId: this.props.auth.user._id,
        number: 10
      })
      this.setState({ records: res.data, isLoading: false })
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
    const { classes, style } = this.props
    const { records, rowsPerPage, page, isLoading } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage)

    const data = {
      labels: records
        .map(record => moment(record.date).format('MMM Do'))
        .reverse(),
      datasets: [
        {
          data: records.map(record => record.points).reverse(),
          borderColor: '#27a6bb',
          fill: false
        }
      ]
    }

    const chartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel
          }
        }
      },
      maintainAspectRatio: false
    }

    const recordBoard = (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {records.length === 0 && (
            <TableRow color="secondary">
              <TableCell>No record yet</TableCell>
            </TableRow>
          )}
          {records
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(record => (
              <TableRow key={record._id}>
                <TableCell component="th" scope="row">
                  {moment(record.date).format('MMM Do')}
                </TableCell>
                <TableCell align="right">{record.type}</TableCell>
                <TableCell align="right">{record.duration}</TableCell>
                <TableCell align="right">{record.points}</TableCell>
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
              count={records.length}
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
      <Paper className={classes.root} elevation={1} style={style}>
        <Typography variant="h5" color="primary" paragraph>
          Exercise Records
          <Button
            component={RouterLink}
            to="/user/record/add"
            className={classes.backBtn}
            variant="contained"
            color="primary"
          >
            + Record
          </Button>
        </Typography>
        <p>
          <Line width={400} height={300} data={data} options={chartOptions} />
        </p>
        {isLoading && <LinearProgress color="primary" />}
        <div className={classes.tableWrapper}>{!isLoading && recordBoard}</div>
      </Paper>
    )
  }
}

Record.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withStyles(styles)(Record))
