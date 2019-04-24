import React, { Component } from 'react'
import TeamService from '../../services/user/TeamService'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pagination from '../common/Pagination'

class Member extends Component {
  state = {
    members: [],
    pagination: 1,
    pageItem: 5,
    error: null
  }

  async componentDidMount() {
    try {
      const res = await TeamService.getTeamMember(this.props.auth.user.team)
      this.setState({
        members: res.data.filter(
          member => member._id !== this.props.auth.user._id
        )
      })
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
    const { members, pageItem, pagination } = this.state

    const currentPage = members.filter(
      (member, index) =>
        index < pagination * pageItem && index >= (pagination - 1) * pageItem
    )

    return (
      <div className="card px-0">
        <h5 className="card-header text-center text-info">Team members</h5>
        <div className="card-body">
          <div className="card-text">
            {members.length === 0 ? (
              <p className="card-text text-center">
                <span className="font-italic text-muted">
                  No Team member yet
                </span>
              </p>
            ) : (
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">
                        <i className="fas fa-user" />
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Points</th>
                      <th scope="col">HiFIVE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPage.map(member => {
                      return (
                        <tr key={member._id}>
                          <th scope="row" />
                          <td>{member.name}</td>
                          <td>{member.points}</td>
                          <td>{member.hifive}</td>
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
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Member.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Member)
