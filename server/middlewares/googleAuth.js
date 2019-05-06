const { OAuth2Client } = require('google-auth-library')
const config = require('config')
const clientId = config.get('google.clientId')
const client = new OAuth2Client(clientId)

module.exports = async function(req, res, next) {
  const errors = {}
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.header('x-auth-token'),
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
    // console.log('googleToken', req.header('x-auth-token'))
    // console.log('google token decoded')
    req.body.googleId = userid
    req.body.email = email
    next()
  } catch (err) {
    return res.status(401).json({
      param: 'unauthorised',
      msg: 'Unauthorised user, please login first'
    })
  }
}
