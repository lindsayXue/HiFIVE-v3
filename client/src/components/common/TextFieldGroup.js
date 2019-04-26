import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  autoComplete,
  disabled
}) => {
  return (
    <div className="form-group">
      <TextField
        id={name}
        name={name}
        label={label}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        type={type}
        value={value}
        autoComplete={autoComplete}
        margin="normal"
        onChange={onChange}
        disabled={disabled}
        error={!error ? false : true}
      />
      {/* <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      /> */}
      {/* {info && <small className="form-text text-left text-muted">{info}</small>} */}
      {error && <div className="invalid-feedback text-left">{error}</div>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
