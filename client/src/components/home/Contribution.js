import React from 'react'

const Contribution = () => {
  return (
    <div>
      <h5 className="card-header text-info">
        Contribution
        <a href="#" className="btn btn-info float-right">
          More
        </a>
      </h5>

      <div className="card-body">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner text-center">
            <div className="carousel-item active">111111</div>
            <div className="carousel-item">222222</div>
            <div className="carousel-item">333333</div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contribution
