import React, { Component } from 'react'
import Rank from './Rank'
import { Link } from 'react-router-dom'
import UserService from '../../services/user/UserService'
import TeamService from '../../services/user/TeamService'

class Contribution extends Component {
  state = {
    userWinner: [],
    teamWinner: [],
    error: 'lalal'
  }

  async componentDidMount() {
    try {
      const resUser = await UserService.getUserWinner()
      const resTeam = await TeamService.getTeamWinner()
      const winnerUserData = resUser.data
      const winnerTeamData = resTeam.data
      this.setState({
        userWinner: winnerUserData.map(winner => {
          return { name: winner.name, points: winner.points }
        }),
        teamWinner: winnerTeamData.map(winner => {
          return { name: winner.name, points: winner.points }
        })
      })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { userWinner, teamWinner, error } = this.state

    return (
      <div>
        <h5 className="card-header">
          Contribution
          <Link to="/user/contribution">
            <button
              type="button"
              className="btn btn-sm btn-default float-right"
            >
              More
            </button>
          </Link>
        </h5>
        <div className="card-body">
          <Rank title="Personal" winner={userWinner} />
          <Rank title="Team" winner={teamWinner} />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    )
  }
}

export default Contribution
