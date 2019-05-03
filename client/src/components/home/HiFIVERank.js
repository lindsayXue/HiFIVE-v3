import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVE'
import { LinearProgress } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

class HiFIVERank extends Component {
  state = {
    rank: [],
    loading: true,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await HiFIVEService.getRank()
      this.setState({ rank: res.data, loading: false })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { rank, loading } = this.state

    const columns = [
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'hifive',
        label: 'HiFIVE'
      }
    ]

    const usersData = rank.map(user => {
      return {
        id: user._id,
        name: user.name,
        hifive: user.hifive
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
      download: false
    }

    return (
      <div>
        {loading && <LinearProgress color="primary" />}
        {!loading && (
          <MUIDataTable
            title="Rank"
            data={usersData}
            columns={columns}
            options={options}
          />
        )}
      </div>
    )
  }
}

export default HiFIVERank
