const express = require('express')
const router = express.Router()

// Middleware
const googleAuth = require('../../middlewares/googleAuth')

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
    let users
    if (!!req.query.number) {
      let skip = !req.query.skip ? 0 : req.query.skip
      users = await User.find()
        .sort({ points: -1 })
        .skip(Number(skip))
        .limit(Number(req.query.number))
    } else {
      users = await User.find().sort({ points: -1 })
    }
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', googleAuth, async (req, res) => {
  try {
    const userProfile = await User.findById(req.body.googleId)

    res.json(userProfile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.get('/login', googleAuth, async (req, res) => {
  try {
    let user = await User.findById(req.body.googleId)
    if (user) {
      return res.json(user)
    } else {
      return res.status(404).json({ unregisteruser: 'User unregister' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', googleAuth, async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    let user = await User.findById(req.body.googleId)
    if (user) {
      errors.userexists = 'User already exists'
      return res.status(400).json(errors)
    }
    const newUser = new User({
      _id: req.body.googleId,
      name: req.body.name,
      email: req.body.email,
      ageRange: req.body.ageRange,
      fitnessLevel: req.body.fitnessLevel,
      gender: req.body.gender,
      jobDesc: req.body.jobDesc,
      department: req.body.department
    })
    if (!!req.body.teamRandom) {
      const team = await Team.find()
        .sort({ member: 1 })
        .limit(1)
      newUser.team = team[0]._id
    } else {
      if (!req.body.team) {
        errors.team = 'Team field is required'
        return res.status(400).json(errors)
      }
      newUser.teamRandom = false
      newUser.team = req.body.team
    }

    // Add team member
    const teamUpdate = await Team.findByIdAndUpdate(newUser.team, {
      $inc: { member: 1 }
    })

    if (!teamUpdate) {
      errors.noteamfound = 'No team found'
      return res.status(400).json(errors)
    }

    // Add participants to activity
    await Activity.findOneAndUpdate(
      {},
      {
        $inc: { participants: 1 }
      }
    )

    await newUser.save()
    return res.json(newUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   PUT api/users/edit
// @desc    Edit user
// @access  Admin
router.put('/edit', googleAuth, async (req, res) => {
  try {
    let editUser = await User.findByIdAndUpdate(req.body.googleId, {
      points: req.body.points,
      hifive: req.body.hifive,
      team: req.body.team,
      accountState: req.body.accountState
    })

    let pointsDiff = req.body.points - editUser.points

    // When edit team
    if (editUser.team !== req.body.team) {
      // Set teamRandom to false
      await User.findByIdAndUpdate(req.body.googleId, {
        teamRandom: false
      })

      // Edit team member and points
      await Team.findByIdAndUpdate(editUser.team, {
        $inc: { member: -1, points: -editUser.points }
      })

      await Team.findByIdAndUpdate(req.body.team, {
        $inc: { member: 1, points: req.body.points }
      })
    } else {
      // Edit team points
      await Team.findByIdAndUpdate(editUser.team, {
        $inc: { points: pointsDiff }
      })
    }

    // Edit activity points
    await Activity.findOneAndUpdate(
      {},
      {
        $inc: { points: pointsDiff }
      }
    )

    res.json(editUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/users/winner
// @desc    Get user rank
// @access  Public
router.get('/winner', async (req, res) => {
  try {
    const tops = await User.find()
      .sort({ points: -1 })
      .limit(3)
    const winner = tops.filter(top => top.points !== 0)
    res.json(winner)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/users/rank/:points/:hifive
// @desc    Get user rank
// @access  Public
router.get('/rank/:points/:hifive', async (req, res) => {
  try {
    const pointsLess = await User.count({
      points: {
        $gt: req.params.points
      }
    })
    const hifiveLess = await User.count({
      hifive: {
        $gt: req.params.hifive
      }
    })
    res.json({
      pointsRank: pointsLess + 1,
      hifiveRank: hifiveLess + 1
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
