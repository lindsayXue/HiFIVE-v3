const { OAuth2Client } = require('google-auth-library')
const clientId =
  '909776054271-l3v0sar1i5nqir67jjo0pn9bv252f9i1.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

module.exports = async function(req, res, next) {
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
    return res.status(401).send('Unauthorised!')
  }
}
