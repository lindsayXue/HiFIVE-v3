import React from 'react'
import { Link } from 'react-router-dom'

const Post = () => {
  return (
    <p className="card-title">
      <Link to="/posts" className="card-link text-dark">
        <i className="fas fa-star text-info" /> Welcome to the System.
      </Link>
      {'  '}
      <i className="far fa-hand-point-left text-info" />
    </p>
  )
}

export default Post
