const { OAuth2Client } = require('google-auth-library')
const config = require('config')
const client = new OAuth2Client(config.googleClientId)

module.exports = async function(req, res, next) {
  const errors = {}
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.headers.authorization.split(' ')[1],
      audience: clientId
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    const payload = ticket.getPayload()
    const userid = payload['sub']
    const email = payload['email']
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    req.body.googleId = userid
    req.body.email = email
    next()
  } catch (err) {
    errors.unauthoriseuser = 'Unauthorised user, please login first'
    return res.status(401).json(errors)
  }
}
