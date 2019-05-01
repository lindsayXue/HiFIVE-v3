import React, { Component } from 'react'
import TeamService from '../../services/user/Team'
import { register } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Grid,
  FormControl,
  TextField,
  Select,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Button,
  Typography,
  Paper
} from '@material-ui/core'
import ErrorInfo from '../common/ErrorInfo'

class Register extends Component {
  state = {
    name: '',
    ageRange: '',
    gender: '',
    department: '',
    jobDesc: '',
    fitnessLevel: '',
    team: '',
    teamRandom: true,
    teamOptions: [],
    error: null
  }

  async componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      return this.props.history.push('/user/home')
    }
    try {
      const res = await TeamService.getTeams()
      const teams = res.data
      let teamOptions = teams.map(team => {
        return {
          id: team._id,
          label: team.name,
          value: team._id
        }
      })
      this.setState({ teamOptions })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
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
      name: this.state.name,
      ageRange: this.state.ageRange,
      gender: this.state.gender,
      department: this.state.department,
      jobDesc: this.state.jobDesc,
      fitnessLevel: this.state.fitnessLevel,
      teamRandom: this.state.teamRandom,
      team: this.state.team
    }

    this.props.register(newUser, this.props.history)
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  render() {
    const {
      name,
      ageRange,
      gender,
      department,
      jobDesc,
      fitnessLevel,
      team,
      teamRandom,
      teamOptions,
      error
    } = this.state
    const { errors } = this.props

    const ageRangeOptions = [
      { label: '20-29', value: '20-29' },
      { label: '30-39', value: '30-39' },
      { label: '40-49', value: '40-49' },
      { label: '50-59', value: '50-59' },
      { label: '60 plus', value: '60 plus' }
    ]

    const genderOptions = [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' }
    ]

    const fitnessLevelOptions = [
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
      <Grid container justify="center" style={{ marginTop: '20px' }}>
        <Grid item lg={4} md={5}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography
              variant="h5"
              component="h3"
              color="primary"
              style={{ marginBottom: '10px' }}
            >
              Sign up
            </Typography>
            <form onSubmit={this.onSubmit}>
              <TextField
                label="Name"
                name="name"
                value={name}
                onChange={this.onChange}
                error={!!errors.name ? true : false}
                fullWidth
              />
              {errors.name && (
                <Typography color="error">{errors.name.msg}</Typography>
              )}
              <FormControl fullWidth error={!!errors.ageRange ? true : false}>
                <InputLabel htmlFor="ageRange">Age</InputLabel>
                <Select
                  value={ageRange}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'ageRange',
                    id: 'ageRange'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ageRangeOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.ageRange && (
                <Typography color="error">{errors.ageRange.msg}</Typography>
              )}
              <FormControl fullWidth error={!!errors.gender ? true : false}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'gender',
                    id: 'gender'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {genderOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.gender && (
                <Typography color="error">{errors.gender.msg}</Typography>
              )}
              <TextField
                label="Department"
                name="department"
                value={department}
                onChange={this.onChange}
                error={!!errors.department ? true : false}
                fullWidth
              />
              {errors.department && (
                <Typography color="error">{errors.department.msg}</Typography>
              )}
              <TextField
                label="Job description"
                name="jobDesc"
                value={jobDesc}
                onChange={this.onChange}
                error={!!errors.jobDesc ? true : false}
                fullWidth
              />
              {errors.jobDesc && (
                <Typography color="error">{errors.jobDesc.msg}</Typography>
              )}
              <FormControl
                fullWidth
                error={!!errors.fitnessLevel ? true : false}
              >
                <InputLabel htmlFor="fitnessLevel">Fitness level</InputLabel>
                <Select
                  value={fitnessLevel}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'fitnessLevel',
                    id: 'fitnessLevel'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {fitnessLevelOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.fitnessLevel && (
                <Typography color="error">{errors.fitnessLevel.msg}</Typography>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={teamRandom}
                    onChange={this.onTeamRandomChange}
                    value="teamRandom"
                    color="primary"
                  />
                }
                label="Random Team"
              />
              <FormControl
                error={!!errors.team ? true : false}
                disabled={teamRandom}
                fullWidth
              >
                <InputLabel htmlFor="team">Select Team</InputLabel>
                <Select
                  value={team}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'team',
                    id: 'team'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {teamOptions.map(item => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.team && (
                <Typography color="error">{errors.team.msg}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Sign up
              </Button>
              {error && (
                <ErrorInfo
                  variant="error"
                  message={error}
                  onClose={this.onErrorClose}
                />
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { register }
)(withRouter(Register))
