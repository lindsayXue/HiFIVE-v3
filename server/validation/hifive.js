const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateHiFIVEInput(data) {
  let errors = {}

  data.reason = !isEmpty(data.reason) ? data.reason : ''

  if (data.receiver.length === 0) {
    errors.receiver = 'Receiver field is required'
  }
  if (Validator.isEmpty(data.reason)) {
    errors.reason = 'Reason field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
