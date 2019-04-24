import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Pagination = props => {
  const {
    pagination,
    pageItem,
    prevClick,
    nextClick,
    currentPage,
    totalNumber
  } = props
  const lastPage = Math.ceil(totalNumber / pageItem)
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className={classnames('page-link', {
              'text-muted': pagination <= 1
            })}
            onClick={prevClick}
            disabled={pagination <= 1 ? 'disabled' : ''}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className={classnames('page-link', {
              'text-muted':
                currentPage.length < pageItem || pagination >= lastPage
            })}
            onClick={nextClick}
            disabled={
              currentPage.length < pageItem || pagination >= lastPage
                ? 'disabled'
                : ''
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
  totalNumber: PropTypes.number.isRequired,
  currentPage: PropTypes.array.isRequired
}

export default Pagination
