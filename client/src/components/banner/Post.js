import React from 'react'
import { Link } from 'react-router-dom'

const Post = () => {
  return (
    <p className="card-title">
      <Link to="#" className="card-link text-dark">
        <i class="fas fa-star text-info" /> Welcome to the System.
      </Link>
      {'  '}
      <i class="far fa-hand-point-left text-info" />
    </p>
  )
}

export default Post
