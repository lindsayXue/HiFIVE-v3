import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ErrorInfo from '../../common/ErrorInfo'
import MUIDataTable from 'mui-datatables'
import HiFIVEService from '../../../services/user/HiFIVE'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '20px'
  }
})

class HiFIVEHistory extends Component {
  _isMounted = false

  state = {
    records: [],
    error: null
  }
  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await HiFIVEService.getHistory()
      if (this._isMounted) {
        this.setState({ records: res.data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { classes, style } = this.props
    const { records, error } = this.state

    const columns = [
      {
        name: 'sender',
        label: 'Sender'
      },
      {
        name: 'receiver',
        label: 'Receiver'
      },
      {
        name: 'reason',
        label: 'Reason',
        options: {
          sort: false
        }
      }
    ]
    const data = records.map(record => {
      return {
        sender: record.sender.name,
        receiver: record.receiver.map(element => element.name).join(','),
        reason: record.reason
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
        filename: 'HiFIVE record history.csv'
      }
    }

    return (
      <div style={style} className={classes.root}>
        <MUIDataTable
          title={'HiFIVE history'}
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

export default withStyles(styles)(HiFIVEHistory)
