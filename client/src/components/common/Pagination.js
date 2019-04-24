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
              'text-muted': props.pagination <= 1
            })}
            onClick={props.prevClick}
            disabled={props.pagination <= 1 ? 'disabled' : ''}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className={classnames('page-link', {
              'text-muted': props.currentPage.length < props.pageItem
            })}
            onClick={props.nextClick}
            disabled={
              props.currentPage.length < props.pageItem ? 'disabled' : ''
            }
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
  currentPage: PropTypes.array.isRequired
}

export default Pagination
