import React, { Component } from 'react'
import RecordService from '../../services/user/Record'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import { Typography, Paper, Button, LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: '20px'
  },
  backBtn: {
    float: 'right'
  }
})

class Record extends Component {
  _isMounted = false

  state = {
    records: [],
    loading: true,
    error: null
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await RecordService.getUserRecord({
        number: 10
      })
      if (this._isMounted) {
        this.setState({ records: res.data, loading: false })
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({ error: err.response.data })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { classes, style, activity, auth } = this.props
    const { records, loading } = this.state

    const columns = [
      {
        name: 'date',
        label: 'Date',
        options: {
          sort: false
        }
      },
      {
        name: 'type',
        label: 'Type',
        options: {
          sort: false
        }
      },
      {
        name: 'duration',
        label: 'Duration',
        options: {
          sort: false
        }
      },
      {
        name: 'points',
        label: 'Points',
        options: {
          sort: false
        }
      }
    ]

    const recordData = records.map(record => ({
      date: moment(record.date).format('MMM Do YYYY'),
      type: record.type,
      duration: record.duration,
      points: record.points
    }))

    const options = {
      print: false,
      filter: false,
      viewColumns: false,
      selectableRows: 'none',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5],
      empty: true,
      download: false
    }

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

    return (
      <div style={style}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" color="primary" paragraph>
            Exercise Records
            <Button
              component={RouterLink}
              to="/user/record/add"
              className={classes.backBtn}
              variant="contained"
              color="primary"
              disabled={
                !auth.user.accountState ||
                !activity.activity ||
                Object.keys(activity.activity).length === 0 ||
                activity.activity.status === 'Paused' ||
                moment(new Date()).isBefore(moment(activity.activity.start))
              }
            >
              + Record
            </Button>
          </Typography>
          <p>
            <Line width={400} height={300} data={data} options={chartOptions} />
          </p>
        </Paper>
        {loading && <LinearProgress color="primary" />}
        {!loading && (
          <MUIDataTable
            title="History"
            data={recordData}
            columns={columns}
            options={options}
          />
        )}
      </div>
    )
  }
}

Record.propTypes = {
  auth: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  activity: state.activity
})

export default connect(mapStateToProps)(withStyles(styles)(Record))
