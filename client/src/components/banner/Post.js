import React from 'react'
import { Link } from 'react-router-dom'

const Post = props => {
  return (
    <div>
      <Link to="/posts" className="text-dark">
        <i className="fas fa-star text-info" /> {props.post.title}
      </Link>
      {'  '}
      <i className="far fa-hand-point-left text-info" />
    </div>
  )
}

export default Post
