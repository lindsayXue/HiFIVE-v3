module.exports = async function(req, res, next) {
  const errors = {}
  try {
    next()
  } catch (err) {
    errors.unauthoriseuser = 'Unauthorised user, please login first'
    return res.status(401).json(errors)
  }
}
