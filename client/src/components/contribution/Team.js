import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import TeamService from '../../services/user/TeamService'

class Team extends Component {
  state = {
    teams: [],
    error: null
  }
  async componentDidMount() {
    try {
      const res = await TeamService.getTeams()
      this.setState({ teams: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }
  render() {
    const { teams, error } = this.state
    console.log(teams)

    const chartData = {
      labels: teams.map(team => team.name),
      datasets: [
        {
          label: '',
          backgroundColor: teams.map(team => team.color),
          data: teams.map(team => team.points)
        }
      ]
    }

    return (
      <div>
        <h5 className="card-header text-center text-info">Team Contribution</h5>
        <div className="card-body">
          <p className="card-text">
            <Bar
              data={chartData}
              width={400}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default Team
