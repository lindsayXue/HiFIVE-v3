import React from 'react'
import { Link } from 'react-router-dom'

const Post = props => {
  return (
    <Link to="/user/posts" className="text-dark">
      <i className="fas fa-star text-primary" /> {props.post.title}
      <i className="far fa-hand-point-left text-primary" />
    </Link>
  )
}

export default Post
