import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const RadioBoxGroup = ({
  option1,
  option2,
  info,
  error,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <div className="form-check">
        <label className="form-check-label" htmlFor={option1}>
          {option1}
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="radioSelect"
          id={option1}
          value={option1}
          onChange={onChange}
          checked
        />
      </div>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

RadioBoxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  option1: PropTypes.string.isRequired,
  option2: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

RadioBoxGroup.defaultProps = {
  type: 'radio'
}

export default RadioBoxGroup
