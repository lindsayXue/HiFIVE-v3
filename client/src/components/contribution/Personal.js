import React, { Component } from 'react'
import UserService from '../../services/user/UserService'
import Pagination from '../common/Pagination'
import TableGroup from '../common/TableGroup'

class Personal extends Component {
  state = {
    users: [],
    pagination: 1,
    pageItem: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await UserService.getUsers()
      this.setState({ users: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  prevClick = e => {
    this.setState({ pagination: this.state.pagination - 1 })
  }

  nextClick = e => {
    this.setState({
      pagination: this.state.pagination + 1
    })
  }

  render() {
    const { users, pagination, pageItem } = this.state

    const currentPage = users.filter(
      (user, index) =>
        index < pagination * pageItem && index >= (pagination - 1) * pageItem
    )

    const usersData = users.map(user => {
      return {
        name: user.name,
        points: user.points,
        hifive: user.hifive
      }
    })

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Points',
          field: 'points',
          sort: 'asc',
          width: 270
        },
        {
          label: 'HiFIVE',
          field: 'hifive',
          sort: 'asc',
          width: 200
        }
      ],
      rows: usersData
    }

    return (
      <div>
        <h5 className="card-header text-center text-default">Personal</h5>
        <div className="card-body">
          <div className="card-text">
            <TableGroup striped bordered hover data={data} />
            {/* <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Name</th>
                  <th scope="col">Points</th>
                  <th scope="col">HiFIVE</th>
                </tr>
              </thead>
              <tbody>
                {currentPage.map(user => {
                  return (
                    <tr key={user._id}>
                      <th scope="row" />
                      <td>{user.name}</td>
                      <td>{user.points}</td>
                      <td>{user.hifive}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table> */}
            {/* <Pagination
              pagination={pagination}
              pageItem={pageItem}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              currentPage={currentPage}
              totalNumber={users.length}
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Personal
