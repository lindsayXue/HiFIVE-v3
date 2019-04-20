const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateActivityInput(data) {
  let errors = {}

  data.start = !isEmpty(data.start) ? data.start : ''
  data.end = !isEmpty(data.end) ? data.end : ''

  if (Validator.isEmpty(data.start)) {
    errors.start = 'Activity start field is required'
  }
  if (Validator.isEmpty(data.end)) {
    errors.end = 'Activity end field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
