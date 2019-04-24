import React from 'react'

const Userinfo = props => {
  return (
    <div
      className="card border border-light bg-light mx-auto"
      style={{ width: '15rem' }}
    >
      <div className="card-body text-center">
        <p className="card-text">
          <i className="fas fa-user" /> <span>{props.user.name}</span>{' '}
          <i className="fas fa-flag" style={props.flagStyle} />
        </p>
        <p className="card-text">
          Points: {props.user.points} <i className="fas fa-hand-paper" />{' '}
          {props.user.hifive}
        </p>
      </div>
    </div>
  )
}

export default Userinfo
