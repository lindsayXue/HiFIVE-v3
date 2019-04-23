import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import TeamService from '../../services/user/TeamService'
import { Link } from 'react-router-dom'

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
    const { teams } = this.state

    const chartData = {
      labels: teams.map(team => team.name),
      datasets: [
        {
          backgroundColor: teams.map(team => team.color),
          data: teams.map(team => team.points)
        }
      ]
    }

    const chartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel
          }
        }
      },
      maintainAspectRatio: false
    }

    return (
      <div>
        <h5 className="card-header text-center text-info">Team</h5>
        <div className="card-body">
          <p className="card-text">
            <Bar
              data={chartData}
              width={400}
              height={300}
              options={chartOptions}
            />
          </p>
        </div>
        <Link to="/user/home">
          <button
            type="button"
            className="btn btn-lg btn-info float-right mr-2"
          >
            Back
          </button>
        </Link>
      </div>
    )
  }
}

export default Team
