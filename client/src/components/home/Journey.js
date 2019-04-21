import React from 'react'
import Auckland from '../../assets/auckland.jpg'

const Journey = () => {
  return (
    <div>
      <img src={Auckland} className="card-img-top" alt="..." />
      <h5 className="card-header text-info">
        Journey
        {/* <button type="button" class="btn btn-sm btn-info float-right">
          Contributions
        </button> */}
        <small className="text-muted font-italic float-right">
          One minute = One meter
        </small>
      </h5>
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Cape Reinga</i>
            </small>
          </div>
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Auckland</i>
            </small>
          </div>
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Wellington</i>
            </small>
          </div>
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Christchurch</i>
            </small>
          </div>
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Dunedin</i>
            </small>
          </div>
          <div className="text-muted">
            <small>
              <i className="fas fa-map-marker-alt">Stirling Point</i>
            </small>
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-info"
            role="progressbar"
            style={{ width: '10%' }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            10%
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journey
