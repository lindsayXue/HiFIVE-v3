import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Rank extends Component {
  render() {
    const { title, winner } = this.props

    let winnerBoard

    if (winner.length === 0) {
      winnerBoard = (
        <p className="card-text text-center">
          <span className="font-italic text-muted">No winner yet</span>
        </p>
      )
    } else if (winner.length === 1) {
      winnerBoard = (
        <div>
          <p className="card-text">
            <i className="fas fa-trophy text-warning" /> {winner[0].name}
            <span className="font-italic float-right text-muted">
              {winner[0].points} points
            </span>
          </p>
          <p className="card-text text-center">
            <span className="font-italic text-muted">No other winner yet</span>
          </p>
        </div>
      )
    } else if (winner.length === 2) {
      winnerBoard = (
        <div>
          <p className="card-text">
            <i className="fas fa-trophy text-warning" /> {winner[0].name}
            <span className="font-italic float-right text-muted">
              {winner[0].points} points
            </span>
          </p>
          <p className="card-text">
            <i className="fas fa-trophy" style={{ color: '#C0C0C0' }} />{' '}
            {winner[1].name}
            <span className="font-italic float-right text-muted">
              {winner[1].points} points
            </span>
          </p>
          <p className="card-text text-center">
            <span className="font-italic text-muted">No other winner yet</span>
          </p>
        </div>
      )
    } else {
      winnerBoard = (
        <div>
          <p className="card-text">
            <i className="fas fa-trophy text-warning" /> {winner[0].name}
            <span className="font-italic float-right text-muted">
              {winner[0].points} points
            </span>
          </p>
          <p className="card-text">
            <i className="fas fa-trophy" style={{ color: '#C0C0C0' }} />{' '}
            {winner[1].name}
            <span className="font-italic float-right text-muted">
              {winner[1].points} points
            </span>
          </p>
          <p className="card-text">
            <i className="fas fa-trophy" style={{ color: '#964B00' }} />{' '}
            {winner[2].name}
            <span className="font-italic float-right text-muted">
              {winner[2].points} points
            </span>
          </p>
        </div>
      )
    }

    return (
      <div className="card border border-white">
        <div className="card-body pb-0">
          <h5 className="card-title text-default">{title}</h5>
          <hr />
          {winnerBoard}
        </div>
      </div>
    )
  }
}

Rank.propTypes = {
  winner: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Rank
