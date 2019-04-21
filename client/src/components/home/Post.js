import React from 'react'
import { Link } from 'react-router-dom'

const Post = () => {
  return (
    <p className="card-title">
      <Link to="#" className="card-link text-dark">
        Welcome to the System.
      </Link>
      <small className="text-muted font-italic float-right">DATE</small>
    </p>
  )
}

export default Post
