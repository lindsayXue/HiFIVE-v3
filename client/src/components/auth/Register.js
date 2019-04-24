import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import CheckBoxGroup from '../common/CheckBoxGroup'
import TeamService from '../../services/user/TeamService'
import { registerUser } from '../../actions/authAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Register extends Component {
  state = {
    googleToken: '',
    name: '',
    ageRange: '',
    gender: '',
    department: '',
    jobDesc: '',
    fitnessLevel: '',
    team: '',
    teamRandom: false,
    teamOptions: []
  }

  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/user/home')
    }
    const res = await TeamService.getTeams()
    const teams = res.data
    let teamOptions = teams.map(team => {
      return {
        id: team._id,
        label: team.name,
        value: team._id
      }
    })
    teamOptions.unshift({
      id: 1,
      label: 'Select a team',
      value: 'Select a team'
    })
    this.setState({ teamOptions })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onTeamRandomChange = e => {
    this.setState({ teamRandom: !this.state.teamRandom })
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      googleToken: this.state.googleToken,
      name: this.state.name,
      ageRange: this.state.ageRange,
      gender: this.state.gender,
      department: this.state.department,
      jobDesc: this.state.jobDesc,
      fitnessLevel: this.state.fitnessLevel,
      teamRandom: this.state.teamRandom,
      team: this.state.team
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const {
      googleToken,
      name,
      ageRange,
      gender,
      department,
      jobDesc,
      fitnessLevel,
      team,
      teamRandom,
      teamOptions
    } = this.state
    const { errors } = this.props

    const ageRangeOptions = [
      { label: 'Select your age range', value: '' },
      { label: '20-29', value: '20-29' },
      { label: '30-39', value: '30-39' },
      { label: '40-49', value: '40-49' },
      { label: '50-59', value: '50-59' },
      { label: '60 plus', value: '60 plus' }
    ]

    const genderOptions = [
      { label: 'Select gender', value: '' },
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' }
    ]

    const fitnessLevelOptions = [
      { label: 'Select fitness level', value: '' },
      { label: 'Exercise once a week', value: 'Exercise once a week' },
      { label: 'Exercise twice a week', value: 'Exercise twice a week' },
      {
        label: 'Exercise three times a week',
        value: 'Exercise three times a week'
      },
      {
        label: 'Exercise five or more times a week',
        value: 'Exercise five or more times a week'
      }
    ]

    return (
      <div className="register mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="text-center text-default m-4">Sign Up</h1>
              <form onSubmit={this.onSubmit} className="text-center">
                <TextFieldGroup
                  placeholder="Google Token"
                  label="Google Token"
                  name="googleToken"
                  value={googleToken}
                  onChange={this.onChange}
                  error={errors.googleToken}
                />
                <TextFieldGroup
                  placeholder="Name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <SelectListGroup
                  name="ageRange"
                  label="Age range"
                  value={ageRange}
                  options={ageRangeOptions}
                  onChange={this.onChange}
                  error={errors.ageRange}
                />
                <SelectListGroup
                  name="gender"
                  label="Gender"
                  value={gender}
                  options={genderOptions}
                  onChange={this.onChange}
                  error={errors.gender}
                />
                <TextFieldGroup
                  placeholder="Department"
                  label="Department"
                  name="department"
                  value={department}
                  onChange={this.onChange}
                  error={errors.department}
                />
                <TextFieldGroup
                  placeholder="Job description"
                  label="Job description"
                  name="jobDesc"
                  value={jobDesc}
                  onChange={this.onChange}
                  error={errors.jobDesc}
                />
                <SelectListGroup
                  name="fitnessLevel"
                  label="Fitness level"
                  value={fitnessLevel}
                  options={fitnessLevelOptions}
                  onChange={this.onChange}
                  error={errors.fitnessLevel}
                />
                <CheckBoxGroup
                  name="teamRandom"
                  label="Team Random"
                  value="teamRandom"
                  onChange={this.onTeamRandomChange}
                />
                <SelectListGroup
                  name="team"
                  label="Team"
                  value={team}
                  options={teamOptions}
                  onChange={this.onChange}
                  error={errors.team}
                  disabled={teamRandom}
                />

                <input type="submit" className="btn btn-default mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register))
