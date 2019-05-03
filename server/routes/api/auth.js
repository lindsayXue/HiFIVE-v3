const express = require('express')
const router = express.Router()
const passport = require('passport')

// Middleware
const userAuth = require('../../middlewares/userAuth')

// Load User model
const User = require('../../models/User')

// @route   GET api/auth
// @desc    Get user auth
// @access  Public
router.get('/', userAuth, async (req, res) => {
  const { id } = req.user
  try {
    const userProfile = await User.findById(id)

    if (!userProfile) {
      return res.status(404).json({ errors: [{ msg: 'User unregistered' }] })
    }

    res.json(userProfile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/auth/google
// @desc    Get user google auth
// @access  Public
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile']
//   })
// )

// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.send('Success login with google!!!')
// })

module.exports = router
