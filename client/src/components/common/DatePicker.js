import React, { Fragment, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import PropTypes from 'prop-types'

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date())
  const { label, handleChangeTo, start, end, error, disableFuture } = props

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          label={label}
          minDate={start}
          maxDate={end}
          disableFuture={disableFuture}
          value={selectedDate}
          onChange={val => {
            handleDateChange(val)
            handleChangeTo(val)
          }}
          fullWidth
          error={!!error ? true : false}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  )
}

BasicDatePicker.defaultProps = {
  disableFuture: true
}

BasicDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  handleChangeTo: PropTypes.func.isRequired,
  disableFuture: PropTypes.bool
}

export default BasicDatePicker
