const express = require('express')
const router = express.Router()

// Middleware
const googleAuth = require('../../middlewares/googleAuth')

// Load User model
const User = require('../../models/User')

// @route   GET api/auth
// @desc    Get user auth
// @access  Public
router.get('/', googleAuth, async (req, res) => {
  const { googleId } = req.body
  try {
    const userProfile = await User.findOne({ googleId }).select('-googleId')

    res.json(userProfile)
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})

module.exports = router
