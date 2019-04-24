import React from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'

function postCarousel(props) {
  return (
    <div>
      <div className="card-body">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner text-center">
            <div className="carousel-item active">
              <Link to="/user/posts" className="text-dark">
                <i className="fas fa-bullhorn text-default" /> Click here to
                Posts Board
              </Link>
              {'  '}
              <i className="far fa-hand-point-left text-default" />
            </div>
            {props.posts.map(post => (
              <div key={post._id} className="carousel-item">
                <Post post={post} />
              </div>
            ))}
          </div>
          {props.posts.length !== 0 && (
            <div>
              <a
                className="carousel-control-prev text-dark"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                {/* <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span> */}
                <i className="fas fa-arrow-left" />
              </a>
              <a
                className="carousel-control-next text-dark"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                {/* <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span> */}
                <i className="fas fa-arrow-right" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default postCarousel
