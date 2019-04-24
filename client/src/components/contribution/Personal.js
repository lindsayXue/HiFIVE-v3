import React, { Component } from 'react'
import UserService from '../../services/user/UserService'
import Pagination from '../common/Pagination'

class Personal extends Component {
  state = {
    users: [],
    pagination: 1,
    pageItem: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await UserService.getUsers({
        number: this.state.pageItem
      })
      this.setState({ users: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  prevClick = async e => {
    try {
      const res = await UserService.getUsers({
        number: this.state.pageItem,
        skip: (this.state.pagination - 2) * this.state.pageItem
      })
      this.setState({ users: res.data, pagination: this.state.pagination - 1 })
    } catch (err) {
      this.setState({ error: err.response })
    }
  }

  nextClick = async e => {
    try {
      const res = await UserService.getUsers({
        number: this.state.pageItem,
        skip: this.state.pagination * this.state.pageItem
      })
      this.setState({ users: res.data, pagination: this.state.pagination + 1 })
    } catch (err) {
      this.setState({
        error: err.response.data
      })
    }
  }

  render() {
    const { users, pagination, pageItem } = this.state

    return (
      <div>
        <h5 className="card-header text-center text-info">Personal</h5>
        <div className="card-body">
          <div className="card-text">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Name</th>
                  <th scope="col">Points</th>
                  <th scope="col">HiFIVE</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
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
            </table>
            <Pagination
              pagination={pagination}
              pageItem={pageItem}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              prevDisa={pagination <= 1 ? 'disabled' : ''}
              nextDisa={users.length < pageItem ? 'disabled' : ''}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Personal
