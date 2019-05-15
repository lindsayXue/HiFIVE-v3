import React, { Component } from 'react'
import HiFIVEService from '../../services/user/HiFIVE'
import { LinearProgress } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

class HiFIVERank extends Component {
  _isMounted = false

  state = {
    rank: [],
    loading: true,
    error: null
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await HiFIVEService.getRank()
      if (this._isMounted) {
        this.setState({ rank: res.data, loading: false })
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
    const { rank, loading } = this.state

    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          sort: false
        }
      },
      {
        name: 'hifive',
        label: 'HiFIVE',
        options: {
          sort: false
        }
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
