const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateHiFIVEInput(data) {
  let errors = {}

  data.sender = !isEmpty(data.sender) ? data.sender : ''
  data.receiver = !isEmpty(data.receiver) ? data.receiver : ''
  data.reason = !isEmpty(data.reason) ? data.reason : ''

  if (Validator.isEmpty(data.sender)) {
    errors.sender = 'Sender field is required'
  }
  if (Validator.isEmpty(data.receiver)) {
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
