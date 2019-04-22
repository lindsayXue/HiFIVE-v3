import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamService from '../../services/user/TeamService'
import TimeBoard from './TimeBoard'
import PostCarousel from './postCarousel'

class Banner extends Component {
  state = {
    team: ''
  }

  async componentDidMount() {
    const res = await TeamService.getUserTeam(this.props.auth.user.team)
    this.setState({ team: res.data })
  }

  render() {
    const { user } = this.props.auth
    const { team } = this.state

    const flagStyle = {
      color: !team.color ? '' : team.color
    }
    console.log(flagStyle)

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
        <PostCarousel />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Banner)
