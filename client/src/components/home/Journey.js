import React from 'react'

import Auckland from '../../assets/auckland.jpg'

const Journey = () => {
  return (
    <div>
      <img src={Auckland} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-info"
            role="progressbar"
            style={{ width: '10%' }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Auckland
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journey
