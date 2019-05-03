import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import ErrorInfo from '../../common/ErrorInfo'
import RecordService from '../../../services/user/Record'
import MUIDataTable from 'mui-datatables'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '20px'
  }
})

class ExerciseHistory extends Component {
  state = {
    records: [],
    error: null
  }
  async componentDidMount() {
    try {
      const res = await RecordService.getRecods()
      this.setState({ records: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { classes, style } = this.props
    const { records, error } = this.state

    const columns = [
      {
        name: 'date',
        label: 'Date'
      },
      {
        name: 'user',
        label: 'User',
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
        label: 'Duration'
      },
      {
        name: 'points',
        label: 'Points'
      }
    ]
    const data = records.map(record => {
      return {
        date: moment(record.date).format('MMM Do YYYY'),
        user: record.user.name,
        type: record.type,
        duration: record.duration,
        points: record.points
      }
    })

    const options = {
      print: false,
      filter: false,
      viewColumns: false,
      selectableRows: 'none',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5],
      empty: true,
      downloadOptions: {
        filename: 'Exercise history.csv'
      }
    }

    return (
      <div style={style} className={classes.root}>
        <MUIDataTable
          title={'Exercise history'}
          data={data}
          columns={columns}
          options={options}
        />
        {error && (
          <ErrorInfo
            variant="error"
            message={error.msg}
            onClose={this.onErrorClose}
          />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(ExerciseHistory)
