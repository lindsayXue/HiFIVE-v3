import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import BonusService from '../../services/user/Bonus'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Grid,
  FormControl,
  TextField,
  Select,
  InputLabel,
  Input,
  Checkbox,
  ListItemText,
  Button,
  MenuItem,
  Typography,
  Paper
} from '@material-ui/core'
import DatePicker from '../common/DatePicker'
import ErrorInfo from '../common/ErrorInfo'
import { addRecord } from '../../actions/record'
import { clearErrors } from '../../actions/error'

class AddRecord extends Component {
  state = {
    date: '',
    type: '',
    typeInput: '',
    duration: '',
    bonus: [],
    bonusOptions: []
  }

  async componentDidMount() {
    try {
      const res = await BonusService.getBonuses()
      this.setState({ bonusOptions: res.data })
    } catch (err) {
      this.setState({ error: err.response.data })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.clearErrors([e.target.name])
  }

  onSubmit = e => {
    e.preventDefault()

    let points = this.state.duration

    const bonusGet = this.state.bonus

    bonusGet.forEach(bonus => {
      const bonusFound = this.state.bonusOptions.filter(
        element => element._id === bonus
      )
      points = Number(points) + Number(bonusFound[0].points)
    })

    const newRecord = {
      date: this.state.date,
      type: this.state.type,
      typeInput: this.state.typeInput,
      duration: this.state.duration,
      bonus: bonusGet,
      points
    }

    this.props.addRecord(newRecord, this.props.history)
  }

  handleDateChange = value => {
    this.setState({ date: value })
    this.props.clearErrors(['date'])
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  render() {
    const { type, typeInput, duration, bonus, bonusOptions } = this.state
    const { errors, activity, auth } = this.props

    const typeOptions = [
      {
        label: 'Walk',
        value: 'Walk'
      },
      {
        label: 'Run',
        value: 'Run'
      },
      {
        label: 'Bike',
        value: 'Bike'
      },
      {
        label: 'Swim',
        value: 'Swim'
      },
      {
        label: 'Dance',
        value: 'Dance'
      },
      {
        label: 'Gym',
        value: 'Gym'
      },
      {
        label: 'Yoga',
        value: 'Yoga'
      },
      {
        label: 'Mindfulness',
        value: 'Mindfulness'
      },
      {
        label: 'Sex',
        value: 'Sex'
      },
      {
        label: 'Other',
        value: 'Other'
      }
    ]

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    }

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
              Add record
              <Button
                component={RouterLink}
                to="/user/profile"
                variant="contained"
                color="primary"
                style={{ float: 'right' }}
              >
                Back
              </Button>
            </Typography>
            <form onSubmit={this.onSubmit}>
              <DatePicker
                label="Exercise date"
                start={activity.start}
                end={activity.end}
                handleChangeTo={this.handleDateChange}
                error={errors.date}
              />
              {errors.date && (
                <Typography color="error">{errors.date.msg}</Typography>
              )}
              <FormControl fullWidth error={!!errors.type ? true : false}>
                <InputLabel htmlFor="type">Exercise type</InputLabel>
                <Select
                  value={type}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'type',
                    id: 'type'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {typeOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.type && (
                <Typography color="error">{errors.type.msg}</Typography>
              )}
              {type === 'Other' && (
                <TextField
                  placeholder="Exercise type"
                  label="Exercise type"
                  name="typeInput"
                  value={typeInput}
                  onChange={this.onChange}
                  error={!!errors.typeInput ? true : false}
                  fullWidth
                />
              )}
              {errors.typeInput && (
                <Typography color="error">{errors.typeInput.msg}</Typography>
              )}
              <TextField
                placeholder="Minute"
                label="Exercise duration"
                name="duration"
                type="number"
                value={duration}
                onChange={this.onChange}
                error={!!errors.duration ? true : false}
                fullWidth
              />
              {errors.duration && (
                <Typography color="error">{errors.duration.msg}</Typography>
              )}
              {bonusOptions.length !== 0 ? (
                <FormControl fullWidth>
                  <InputLabel htmlFor="select-multiple-checkbox">
                    Bonus
                  </InputLabel>
                  <Select
                    multiple
                    value={bonus}
                    name="bonus"
                    onChange={this.onChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => {
                      let displaySelected = []
                      for (let i = 0; i < selected.length; i++) {
                        const selectedBonus = bonusOptions.filter(
                          bonus => bonus._id === selected[i]
                        )
                        displaySelected.push(selectedBonus[0].name)
                      }
                      return displaySelected.join(',')
                    }}
                    MenuProps={MenuProps}
                  >
                    {bonusOptions.map(element => (
                      <MenuItem key={element._id} value={element._id}>
                        <Checkbox checked={bonus.indexOf(element._id) > -1} />
                        <ListItemText primary={element.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ''
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                disabled={
                  !auth.user.accountState ||
                  !activity ||
                  Object.keys(activity).length === 0
                }
              >
                Add
              </Button>
            </form>
            {errors.server && (
              <ErrorInfo
                variant="error"
                message={errors.server.msg}
                onClose={this.onErrorClose}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AddRecord.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addRecord: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  activity: state.activity.activity,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addRecord, clearErrors }
)(withRouter(AddRecord))
