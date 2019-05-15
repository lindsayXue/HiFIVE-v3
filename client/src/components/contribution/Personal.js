import React, { Component } from 'react'
import UserService from '../../services/user/User'
import { Paper, LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

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

class Personal extends Component {
  _isMounted = false
  state = {
    users: [],
    loading: true,
    error: null
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      const res = await UserService.getUsers()
      if (this._isMounted) {
        this.setState({ users: res.data, loading: false })
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
    const { users, loading } = this.state
    const { classes, style } = this.props
    const columns = [
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'points',
        label: 'Points'
      },
      {
        name: 'hifive',
        label: 'HiFIVE'
      }
    ]
    const usersData = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        points: user.points,
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
      <Paper className={classes.root} style={style}>
        <div className={classes.tableWrapper}>
          {loading && <LinearProgress color="primary" />}
          {!loading && (
            <MUIDataTable
              title="Individual"
              data={usersData}
              columns={columns}
              options={options}
            />
          )}
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(Personal)
