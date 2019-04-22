import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const CheckBoxGroup = ({
  name,
  value,
  label,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <div className="form-check text-center">
        <input
          className="form-check-input"
          type="checkbox"
          id={name}
          value={value}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

CheckBoxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

CheckBoxGroup.defaultProps = {
  type: 'checkbox'
}

export default CheckBoxGroup
