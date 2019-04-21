import React, { Component } from 'react'
import Rank from './Rank'
import { Link } from 'react-router-dom'

class Contribution extends Component {
  render() {
    const userWinner = [
      {
        name: 'Lingzi Xue',
        points: 2000
      },
      {
        name: 'Yuanjie Wu',
        points: 1900
      },
      {
        name: 'Zhinan Wu',
        points: 1800
      }
    ]

    const teamWinner = [
      {
        name: 'RED',
        points: 2000
      },
      {
        name: 'BLUE',
        points: 1900
      },
      {
        name: 'LIME',
        points: 1800
      }
    ]

    return (
      <div>
        <h5 className="card-header">
          Contribution
          <Link to="/contribution">
            <button type="button" className="btn btn-sm btn-info float-right">
              View More
            </button>
          </Link>
        </h5>
        <div className="card-body my-auto">
          <Rank title="Personal" data={userWinner} />
          <Rank title="Team" data={teamWinner} />
        </div>
      </div>
    )
  }
}

export default Contribution
