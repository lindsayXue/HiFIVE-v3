import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamService from '../../services/user/TeamService'
import PostService from '../../services/user/PostService'
import TimeBoard from './TimeBoard'
import PropTypes from 'prop-types'

import PostCarousel from './postCarousel'

class Banner extends Component {
  state = {
    team: '',
    posts: []
  }

  async componentDidMount() {
    const teamRes = await TeamService.getUserTeam(this.props.auth.user.team)
    const postsRes = await PostService.getPosts()
    this.setState({ team: teamRes.data, posts: postsRes.data })
  }

  render() {
    const { user } = this.props.auth
    const { team, posts } = this.state

    const flagStyle = {
      color: !team.color ? '' : team.color
    }

    return (
      <div>
        <div className="banner bg-light row justice-content-around">
          <div className="col-md-7 my-auto text-center text-dark">
            <h3 className="my-3">
              Welcome to
              <span className="text-info"> HiFIVE </span>
              Community
            </h3>
            <p>
              <i className="fas fa-user" /> {user.name}{' '}
              <i className="fas fa-flag" style={flagStyle} />
            </p>
          </div>
          <div className="col-md-3 my-auto">
            <TimeBoard />
          </div>
        </div>
        <PostCarousel posts={posts} />
      </div>
    )
  }
}

Banner.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Banner)
