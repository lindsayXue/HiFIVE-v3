const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateBonusInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.points = !isEmpty(data.points) ? data.points : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Exercise name field is required'
  }
  if (Validator.isEmpty(data.points)) {
    errors.points = 'Exercise points field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
