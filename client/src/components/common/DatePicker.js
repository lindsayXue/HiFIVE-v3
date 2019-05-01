import React, { Fragment, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import PropTypes from 'prop-types'

function BasicDatePicker({
  label,
  handleChangeTo,
  start,
  end,
  error,
  disableFuture
}) {
  const [selectedDate, handleDateChange] = useState(null)

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
  start: PropTypes.string,
  end: PropTypes.string,
  handleChangeTo: PropTypes.func.isRequired,
  disableFuture: PropTypes.bool
}

export default BasicDatePicker
