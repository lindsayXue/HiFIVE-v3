const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load User model
const User = require('../../models/User')

// Middleware
const userAuth = require('../../middlewares/userAuth')

// Config
const config = require('config')

// @route   GET api/auth
// @desc    Get user auth
// @access  Public
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId })
    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'User unauthorised' }] })
    }
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/auth/google
// @desc    Get user google auth
// @access  Public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${config.get(
      'google.redirectURL'
    )}?error=google signin error`
  }),
  async (req, res) => {
    try {
      const user = await User.findOne({
        googleId: req.user.googleId
      })
      if (!user) {
        // return res.status(404).json({ errors: [{ msg: 'User unregistered' }] })
        return res.redirect(`${config.get('google.redirectURL')}/register`)
      }
      res.redirect(config.get('google.redirectURL'))
    } catch (err) {
      console.log(err)
      res.redirect(`${config.get('google.redirectURL')}?error=server error`)
    }
  }
)

// @route   GET api/auth/logout
// @desc    Get user logout
// @access  Public
router.get('/logout', (req, res) => {
  req.logout()
  res.end()
})

module.exports = router
