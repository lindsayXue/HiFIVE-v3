import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVE'
import { LinearProgress } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

class HiFIVEHis extends Component {
  state = {
    history: [],
    loading: true,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getHistory()
      this.setState({ history: res.data, loading: false })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { history, loading } = this.state

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
        label: 'Reason'
      }
    ]

    const historyTable = history.map(element => ({
      sender: element.sender.name,
      receiver: element.receiver[0].name,
      reason: element.reason
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

    return (
      <div>
        {loading && <LinearProgress color="primary" />}
        {!loading && (
          <MUIDataTable
            title="History"
            data={historyTable}
            columns={columns}
            options={options}
          />
        )}
      </div>
    )
  }
}

export default HiFIVEHis
