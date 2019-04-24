import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import CheckBoxGroup from '../common/CheckBoxGroup'
import BonusService from '../../services/user/BonusService'
import { addRecord } from '../../actions/recordAction'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class AddRecord extends Component {
  state = {
    date: '',
    type: '',
    typeInput: '',
    duration: '',
    bonus: [],
    bonusOptions: [],
    error: null
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
  }

  onBonusCheck = e => {
    console.log(e.target.value)
  }

  onSubmit = e => {
    e.preventDefault()

    const newRecord = {
      date: this.state.date,
      type: this.state.type,
      typeInput: this.state.typeInput,
      duration: this.state.duration,
      bonus: this.state.bonus
    }
    console.log(newRecord)

    this.props.addRecord(newRecord, this.props.history)
  }

  render() {
    const { date, type, typeInput, duration, bonusOptions } = this.state
    const { errors } = this.props

    const typeOptions = [
      {
        label: 'Select exercise type',
        value: ''
      },
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

    return (
      <div className="register mt-4">
        <div className="container">
          <div className="row">
            <div className="card col-md-6 m-auto">
              <h4 className="text-center text-default m-4">
                Add Exercise Record
                <Link to="/user/profile">
                  <button
                    type="button"
                    className="btn btn-sm btn-default float-right"
                  >
                    Back
                  </button>
                </Link>
              </h4>
              <form onSubmit={this.onSubmit} className="text-center">
                <TextFieldGroup
                  label="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={this.onChange}
                  info="Select exercise date"
                  error={errors.date}
                />
                <SelectListGroup
                  name="type"
                  label="Exercise type"
                  value={type}
                  options={typeOptions}
                  onChange={this.onChange}
                  error={errors.type}
                />
                {type === 'Other' && (
                  <TextFieldGroup
                    name="typeInput"
                    label="Exercise type"
                    placeholder="Input exercise type"
                    value={typeInput}
                    onChange={this.onChange}
                    disabled={type === 'Other' ? '' : 'disabled'}
                    error={errors.typeInput}
                  />
                )}
                <TextFieldGroup
                  placeholder="Exercise duration"
                  label="Exercise duration"
                  name="duration"
                  value={duration}
                  onChange={this.onChange}
                  error={errors.duration}
                />
                {/* <div className="row">
                  {bonusOptions.map(bonus => (
                    <div key={bonus._id} className="col">
                      <CheckBoxGroup
                        name={bonus.name}
                        label={bonus.name}
                        value={bonus._id}
                        onChange={this.onBonusCheck}
                      />
                    </div>
                  ))}
                </div> */}

                <input type="submit" className="btn btn-default m-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddRecord.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addRecord }
)(withRouter(AddRecord))
