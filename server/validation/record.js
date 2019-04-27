const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRecordInput(data) {
  let errors = {}

  data.date = !isEmpty(data.date) ? data.date : ''
  data.type = !isEmpty(data.type) ? data.type : ''
  data.typeInput = !isEmpty(data.typeInput) ? data.typeInput : ''
  data.duration = !isEmpty(data.duration) ? data.duration : ''

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Exercise date field is required'
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = 'Exercise type field is required'
  }
  if (data.type === 'Other' && Validator.isEmpty(data.typeInput)) {
    errors.typeInput = 'Exercise type field is required'
  }
  if (Validator.isEmpty(data.duration)) {
    errors.duration = 'Exercise duration field is required'
  }
  if (data.duration > 300) {
    errors.duration =
      'Exercise duration can not be over 300 minutes. Please contact administrator.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
