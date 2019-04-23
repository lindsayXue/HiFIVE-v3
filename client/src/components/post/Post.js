import React, { Component } from 'react'
import PostService from '../../services/user/PostService'
import { Link } from 'react-router-dom'

class Post extends Component {
  state = {
    posts: [],
    error: null
  }

  async componentDidMount() {
    const res = await PostService.getPosts()
    this.setState({ posts: res.data })
    try {
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  render() {
    const { posts } = this.state

    return (
      <div className="row post-board d-flex justify-content-center">
        <div className="card col-md-6 px-0">
          <h5 className="card-header text-center text-info">
            Posts board
            <Link to="/user/home">
              <button type="button" className="btn btn-sm btn-info float-right">
                Back
              </button>
            </Link>
          </h5>
          <div className="card-body">
            {posts.map(post => (
              <p className="card-text" key={post._id}>
                {post.title}
              </p>
            ))}
            {posts.length === 0 && (
              <p className="text-muted font-italic">No post yet</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Post
