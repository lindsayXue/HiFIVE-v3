const express = require('express')
const router = express.Router()

// Load User model
const User = require('../../models/User')

// @route GET api/users/test
// @desc  Tests users route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users Route Works!'
  })
)

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const errors = {}

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(console.errors)
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId
      })
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    }
  })
})

module.exports = router
