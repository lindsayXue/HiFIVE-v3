import React from 'react'

const Rank = props => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title text-info">{props.title}</h5>
        <p className="card-text">
          <i className="fas fa-trophy text-warning" /> {props.data[0].name}
          <span className="font-italic float-right text-muted">
            {props.data[0].points} minutes
          </span>
        </p>
        <p className="card-text">
          <i className="fas fa-trophy" style={{ color: '#C0C0C0' }} />{' '}
          {props.data[1].name}
          <span className="font-italic float-right text-muted">
            {props.data[1].points} minutes
          </span>
        </p>
        <p className="card-text">
          <i className="fas fa-trophy" style={{ color: '#964B00' }} />{' '}
          {props.data[2].name}
          <span className="font-italic float-right text-muted">
            {props.data[2].points} minutes
          </span>
        </p>
      </div>
    </div>
  )
}

export default Rank
