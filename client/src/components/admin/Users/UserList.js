import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ErrorInfo from '../../common/ErrorInfo'
import UserService from '../../../services/user/User'
import TeamService from '../../../services/user/Team'
import { editUser } from '../../../actions/user'
import MUIDataTable from 'mui-datatables'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  CircularProgress
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setErrors, clearErrors } from '../../../actions/error'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    marginTop: '20px'
  },
  createBtn: {
    float: 'right'
  }
})

class UserList extends Component {
  state = {
    userList: [],
    userEditing: {},
    teamOptions: [],
    team: '',
    points: '',
    hifive: '',
    accountState: '',
    editing: false,
    formLoading: false,
    usersLoading: false,
    noEditError: false
  }
  async componentDidMount() {
    try {
      const res = await UserService.getUsers()
      this.setState({ userList: res.data })
    } catch (err) {
      console.log(err)
      this.props.setErrors(err.response.data)
    }
  }

  handleClose = e => {
    this.setState({ editing: false })
    this.clearForm()
  }

  editUser = async e => {
    try {
      const userRes = await UserService.getUserByID(e[0])
      const teamRes = await TeamService.getTeams()
      this.setState({
        userEditing: userRes.data,
        teamOptions: teamRes.data,
        team: userRes.data.team._id,
        points: userRes.data.points,
        hifive: userRes.data.hifive,
        accountState: userRes.data.accountState,
        editing: true
      })
    } catch (err) {
      console.log(err)
    }
  }

  onErrorClose = () => {
    this.props.clearErrors(['server'])
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, noEditError: false })
    this.props.clearErrors([e.target.name])
  }

  clearForm = () => {
    this.setState({
      team: '',
      points: '',
      hifive: '',
      accountState: '',
      editing: false,
      noEditError: false
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ formLoading: true })
    const { team, points, hifive, accountState } = this.state

    if (
      this.state.userEditing.team._id === team &&
      this.state.userEditing.points === Number(points) &&
      this.state.userEditing.hifive === Number(hifive) &&
      this.state.userEditing.accountState === accountState
    ) {
      return this.setState({ noEditError: true, formLoading: false })
    }

    const userEditData = {
      userId: this.state.userEditing._id,
      team,
      points: Number(points),
      hifive: Number(hifive),
      accountState
    }

    this.props.editUser(userEditData).then(async () => {
      this.setState({ formLoading: false })
      try {
        this.setState({ usersLoading: true })
        const res = await UserService.getUsers()
        this.setState({ userList: res.data, usersLoading: false })
        this.clearForm()
      } catch (err) {
        this.setErrors(err.response.data)
        this.setState({ usersLoading: false })
      }
    })
  }

  render() {
    const { classes, style, errors } = this.props
    const {
      userList,
      userEditing,
      editing,
      team,
      points,
      hifive,
      accountState,
      teamOptions,
      formLoading,
      usersLoading,
      noEditError
    } = this.state

    const columns = [
      {
        name: 'id',
        label: 'Id',
        options: {
          display: false
        }
      },
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          display: false
        }
      },
      {
        name: 'gender',
        label: 'Gender'
      },
      {
        name: 'jobDesc',
        label: 'Job description'
      },
      {
        name: 'department',
        label: 'Department'
      },
      {
        name: 'teamMode',
        label: 'Team mode'
      },
      {
        name: 'team',
        label: 'Team'
      },
      {
        name: 'points',
        label: 'Points'
      },
      {
        name: 'hifive',
        label: 'HiFIVE'
      },
      {
        name: 'accountState',
        label: 'Account state'
      }
    ]
    const data = userList.map(user => {
      let teamMode, accountState
      if (user.teamRandom) {
        teamMode = 'random'
      } else {
        teamMode = 'select'
      }

      if (user.accountState) {
        accountState = 'active'
      } else {
        accountState = 'inactive'
      }
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        jobDesc: user.jobDesc,
        department: user.department,
        teamMode,
        team: user.team.name,
        points: user.points,
        hifive: user.hifive,
        accountState
      }
    })

    const options = {
      print: false,
      filter: false,
      viewColumns: false,
      selectableRows: 'none',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5],
      empty: true,
      downloadOptions: {
        filename: 'Users profile.csv'
      },
      onRowClick: e => {
        this.editUser(e)
      }
    }

    const accountStateOptions = [
      {
        label: 'active',
        value: true
      },
      {
        label: 'inactive',
        value: false
      }
    ]

    return (
      <div style={style} className={classes.root}>
        {usersLoading && (
          <CircularProgress className={classes.progress} color="primary" />
        )}
        <MUIDataTable
          title={'Users <Click any row you want to edit>'}
          data={data}
          columns={columns}
          options={options}
        />

        {errors.server && (
          <ErrorInfo
            variant="error"
            message={errors.server.msg}
            onClose={this.onErrorClose}
          />
        )}
        <Dialog
          aria-labelledby="form-dialog-title"
          open={editing}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            {userEditing.name}
            <Button
              variant="contained"
              color="primary"
              className={classes.createBtn}
              onClick={this.handleClose}
            >
              <i className="fas fa-times" />
            </Button>
          </DialogTitle>
          <DialogContent>
            {noEditError && (
              <Typography color="error">User unedited</Typography>
            )}
            {formLoading && (
              <CircularProgress className={classes.progress} color="primary" />
            )}
            <form onSubmit={this.onSubmit}>
              <FormControl error={!!errors.team ? true : false} fullWidth>
                <InputLabel htmlFor="team">Edit Team</InputLabel>
                <Select
                  value={team}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'team',
                    id: 'team'
                  }}
                >
                  {teamOptions.map(team => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.team && (
                <Typography color="error">{errors.team.msg}</Typography>
              )}
              <TextField
                label="Points"
                name="points"
                type="number"
                value={points}
                onChange={this.onChange}
                error={!!errors.points ? true : false}
                fullWidth
              />
              {errors.points && (
                <Typography color="error">{errors.points.msg}</Typography>
              )}
              <TextField
                label="HiFIVE"
                name="hifive"
                type="number"
                value={hifive}
                onChange={this.onChange}
                error={!!errors.hifive ? true : false}
                fullWidth
              />
              {errors.hifive && (
                <Typography color="error">{errors.hifive.msg}</Typography>
              )}

              <FormControl error={!!errors.hifive ? true : false} fullWidth>
                <InputLabel htmlFor="accountState">
                  Edit account state
                </InputLabel>
                <Select
                  value={accountState}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'accountState',
                    id: 'accountState'
                  }}
                >
                  {accountStateOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                Edit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

UserList.propTypes = {
  errors: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editUser, setErrors, clearErrors }
)(withStyles(styles)(UserList))
