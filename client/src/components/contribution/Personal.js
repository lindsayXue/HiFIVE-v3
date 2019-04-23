import React, { Component } from 'react'
import UserService from '../../services/user/UserService'
import classnames from 'classnames'

class Personal extends Component {
  state = {
    users: [],
    pagination: 1,
    itemPage: 3,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await UserService.getUsers({
        number: this.state.itemPage
      })
      this.setState({ users: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  prevClick = async e => {
    try {
      const res = await UserService.getUsers({
        number: this.state.itemPage,
        skip: (this.state.pagination - 2) * this.state.itemPage
      })
      this.setState({ users: res.data, pagination: this.state.pagination - 1 })
    } catch (err) {
      this.setState({ error: err.response })
    }
  }

  nextClick = async e => {
    try {
      const res = await UserService.getUsers({
        number: this.state.itemPage,
        skip: this.state.pagination * this.state.itemPage
      })
      this.setState({ users: res.data, pagination: this.state.pagination + 1 })
    } catch (err) {
      this.setState({
        error: err.response.data
      })
    }
  }

  render() {
    const { users, pagination, itemPage, error } = this.state

    return (
      <div>
        <h5 className="card-header text-center text-info">
          Personal Contribution
        </h5>
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
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className={classnames('page-link', {
                      'text-muted': pagination <= 1
                    })}
                    onClick={this.prevClick}
                    disabled={pagination <= 1 ? 'disabled' : ''}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className={classnames('page-link', {
                      'text-muted': users.length < itemPage
                    })}
                    onClick={this.nextClick}
                    disabled={users.length < itemPage ? 'disabled' : ''}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Personal
