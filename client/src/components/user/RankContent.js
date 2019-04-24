import React from 'react'
import PropTypes from 'prop-types'

const RankContent = props => {
  return (
    <div className="card px-0">
      <div className="card-body">
        <div className="card-title">{props.title} Rank</div>
        <div className="card-text text-center">
          <i className="fas fa-star" /> {props.rank}
        </div>
      </div>
    </div>
  )
}

RankContent.propTypes = {
  title: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired
}

export default RankContent
