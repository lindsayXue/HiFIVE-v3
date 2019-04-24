import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Pagination = props => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className={classnames('page-link', {
              'text-muted': props.prevDisa === 'disabled'
            })}
            onClick={props.prevClick}
            disabled={props.prevDisa}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className={classnames('page-link', {
              'text-muted': props.nextDisa === 'disabled'
            })}
            onClick={props.nextClick}
            disabled={props.nextDisa}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  pagination: PropTypes.number.isRequired,
  pageItem: PropTypes.number.isRequired,
  prevClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
  prevDisa: PropTypes.string.isRequired,
  nextDisa: PropTypes.string.isRequired
}

export default Pagination
