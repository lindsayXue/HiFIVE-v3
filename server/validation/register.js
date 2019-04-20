const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.googleId = !isEmpty(data.googleId) ? data.googleId : ''
  data.ageRange = !isEmpty(data.ageRange) ? data.ageRange : ''
  data.fitnessLevel = !isEmpty(data.fitnessLevel) ? data.fitnessLevel : ''
  data.gender = !isEmpty(data.gender) ? data.gender : ''
  data.jobDesc = !isEmpty(data.jobDesc) ? data.jobDesc : ''
  data.department = !isEmpty(data.department) ? data.department : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }
  if (Validator.isEmpty(data.ageRange)) {
    errors.ageRange = 'Age range field is required'
  }
  if (Validator.isEmpty(data.fitnessLevel)) {
    errors.fitnessLevel = 'Fitness level field is required'
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required'
  }
  if (Validator.isEmpty(data.jobDesc)) {
    errors.jobDesc = 'Job description field is required'
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department field is required'
  }

  // TODO: Validate team input

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
