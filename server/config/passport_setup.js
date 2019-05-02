const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('config')
const googleCred = config.get('google')
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    await User.findById(id)
    done(null)
  } catch (err) {
    console.log(err)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCred.get('clientId'),
      clientSecret: googleCred.get('clientSecret'),
      callbackURL: '/api/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.find({ googleId: profile.id })
        if (user) {
          console.log(user)
          done(null, user)
        }
        console.log('No user found')
      } catch (err) {
        console.log(err)
      }
    }
  )
)
