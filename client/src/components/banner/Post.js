import React from 'react'
import { Link } from 'react-router-dom'

const Post = props => {
  return (
    <Link to="/user/posts" className="text-dark">
      <i className="fas fa-star text-default" /> {props.post.title}
      <i className="far fa-hand-point-left text-default" />
    </Link>
  )
}

export default Post
