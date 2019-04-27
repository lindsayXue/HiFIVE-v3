import React, { Component } from 'react'
import TeamService from '../../services/user/TeamService'
import { registerUser } from '../../actions/authAction'
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
                name="googleToken"
                label="Google Id"
                value={googleToken}
                onChange={this.onChange}
                required
                fullWidth
              />
              <TextField
                placeholder="Name"
                label="Name"
                name="name"
                value={name}
                onChange={this.onChange}
                error={!!errors.name ? true : false}
                fullWidth
              />
              {errors.name && (
                <Typography color="error">{errors.name}</Typography>
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
                <Typography color="error">{errors.ageRange}</Typography>
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
                <Typography color="error">{errors.gender}</Typography>
              )}
              <TextField
                placeholder="Department"
                label="Department"
                name="department"
                value={department}
                onChange={this.onChange}
                error={!!errors.department ? true : false}
                fullWidth
              />
              {errors.department && (
                <Typography color="error">{errors.department}</Typography>
              )}
              <TextField
                placeholder="Job description"
                label="Job description"
                name="jobDesc"
                value={jobDesc}
                onChange={this.onChange}
                error={!!errors.jobDesc ? true : false}
                fullWidth
              />
              {errors.jobDesc && (
                <Typography color="error">{errors.jobDesc}</Typography>
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
                <Typography color="error">{errors.fitnessLevel}</Typography>
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
                <Typography color="error">{errors.team}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Sign up
              </Button>
            </form>
            {!!errors.unregisteruser || errors.servererror ? (
              <div className="alert alert-danger" role="alert">
                {errors.unregisteruser || errors.servererror}
              </div>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
      </Grid>
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
