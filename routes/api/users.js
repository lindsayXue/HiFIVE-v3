const express = require('express')
const router = express.Router()

// Middleware
// const googleAuth = require('../../middlewares/googleAuth')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')

// Load User model
const User = require('../../models/User')

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.get('/login', async (req, res) => {
  try {
    let user = await User.findOne({ googleId: req.body.googleId })
    if (user) {
      return res.json(user)
    } else {
      return res.status(400).json('User unregistered')
    }
  } catch (err) {
    console.log(err)
  }
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    let user = await User.findOne({ googleId: req.body.googleId })
    if (user) {
      errors.googleId = 'User already exists'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId,
        ageRange: req.body.ageRange,
        fitnessLevel: req.body.fitnessLevel,
        gender: req.body.gender,
        jobDesc: req.body.jobDesc,
        department: req.body.department
      })
      await newUser.save()
      return res.json(newUser)
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
