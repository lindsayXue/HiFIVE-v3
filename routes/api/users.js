const express = require('express')
const router = express.Router()

// Middleware
// const googleAuth = require('../../middlewares/googleAuth')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')

// Load User model
const User = require('../../models/User')

// Load Activity model
const Activity = require('../../models/Activity')

// Load Team model
const Team = require('../../models/Team')

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    let users
    if (!!req.body.number) {
      let skip = !req.body.skip ? 0 : req.body.skip
      users = await User.find()
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(req.body.number))
    } else {
      users = await User.find().sort({ createdAt: -1 })
    }
    if (users.length == 0) {
      errors.nouserfound = 'No user found'
      return res.status(404).json(errors)
    } else {
      res.json(users)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.get('/login', async (req, res) => {
  const errors = {}
  try {
    let user = await User.findOne({ googleId: req.body.googleId })
    if (user) {
      return res.json(user)
    } else {
      errors.unregisteruser = 'User unregistered'
      return res.status(404).json(errors)
    }
  } catch (err) {
    res.status(500).json({ servererror: 'Server error' })
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
    }
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
    if (!!req.body.teamSelect) {
      newUser.teamRandom = false
      newUser.team = req.body.team
    } else {
      const team = await Team.find()
        .sort({ member: 1 })
        .limit(1)
      newUser.team = team[0]._id
    }

    // Add team member
    const teamUpdate = await Team.findByIdAndUpdate(newUser.team, {
      $inc: { member: 1 }
    })

    if (!teamUpdate) {
      errors.noteamfound = 'No team found'
      return res.status(400).json(errors)
    }

    // Add participant to activity
    await Activity.findOneAndUpdate(
      {},
      {
        $inc: { participant: 1 }
      }
    )

    await newUser.save()
    return res.json(newUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
