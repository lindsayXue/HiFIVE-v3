import React, { Fragment, useState } from 'react'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date())
  const { handleChangeTo, start, end, error } = props

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          autoOk
          id="date"
          label="Exercise date"
          clearable
          disableFuture
          minDate={new Date(start)}
          maxDate={new Date(end)}
          value={selectedDate}
          onChange={val => {
            handleDateChange(val)
            handleChangeTo(val)
          }}
          error={!!error ? true : false}
          fullWidth
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  )
}

export default BasicDatePicker
