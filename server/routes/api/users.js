const express = require('express')
const router = express.Router()

// Middleware
const googleAuth = require('../../middlewares/googleAuth')
const adminAuth = require('../../middlewares/adminAuth')

// Load User model
const User = require('../../models/User')

// Load Activity model
const Activity = require('../../models/Activity')

// Load Team model
const Team = require('../../models/Team')

const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator/check')

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.get('/login', googleAuth, async (req, res) => {
  const { googleId } = req.body
  try {
    let user = await User.findOne({ googleId }).select('-googleId')

    if (!user || Object.keys(user).length === 0) {
      return res.status(404).json({ errors: [{ msg: 'User unregistered' }] })
    }

    // Sign JWT Token
    const payload = {
      user: {
        id: user._id
      }
    }

    const token = jwt.sign(payload, config.get('jwtSecretUser'), {
      expiresIn: 3600
    })

    res.json({ user, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  googleAuth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('ageRange', 'Age is required')
      .not()
      .isEmpty(),
    check('fitnessLevel', 'Fitness level is required')
      .not()
      .isEmpty(),
    check('gender', 'Gender level is required')
      .not()
      .isEmpty(),
    check('jobDesc', 'Job is required')
      .not()
      .isEmpty(),
    check('department', 'Department is required')
      .not()
      .isEmpty(),
    check('team', 'Team is required').custom((value, { req }) => {
      if (!req.body.teamRandom && !value) {
        return false
      }
      return true
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const {
      googleId,
      email,
      name,
      ageRange,
      fitnessLevel,
      gender,
      jobDesc,
      department
    } = req.body

    try {
      let user = await User.find({ googleId })

      if (user.length !== 0) {
        return res.status(400).json({ errors: { msg: 'User already exists' } })
      }
      const newUser = new User({
        googleId,
        name,
        email,
        ageRange,
        fitnessLevel,
        gender,
        jobDesc,
        department
      })

      // Random or Select Team

      if (!req.body.teamRandom) {
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
        return res.status(400).json({ errors: { msg: 'Team not found' } })
      }

      // Add participants to activity
      await Activity.findOneAndUpdate(
        {},
        {
          $inc: { participants: 1 }
        }
      )

      await newUser.save()

      // Sign JWT Token
      const payload = {
        user: {
          id: user._id
        }
      }

      const token = jwt.sign(payload, config.get('jwtSecretUser'), {
        expiresIn: 3600
      })

      return res.json({
        token,
        user: newUser
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// // @route   GET api/users
// // @desc    Get all users
// // @access  Public
router.get('/', async (req, res) => {
  try {
    let users
    if (!!req.query.number) {
      let skip = !req.query.skip ? 0 : req.query.skip
      users = await User.find()
        .select('-googleId')
        .sort({ points: -1 })
        .skip(Number(skip))
        .limit(Number(req.query.number))
        .populate('team', 'name')
    } else {
      users = await User.find()
        .select('-googleId')
        .sort({ points: -1 })
        .populate('team', 'name')
    }
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/users/winner
// @desc    Get user rank
// @access  Public
router.get('/winner', async (req, res) => {
  try {
    const tops = await User.find()
      .select('-googleId')
      .sort({ points: -1 })
      .limit(3)
    const winner = tops.filter(top => top.points !== 0)
    res.json(winner)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/users/:id
// @desc    Get user
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id).populate('team', ['_id', 'name'])

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   PUT api/users/edit
// @desc    Edit user
// @access  Admin
router.put(
  '/edit',
  adminAuth,
  [
    check('points', 'Points is required')
      .not()
      .isEmpty(),
    check('hifive', 'HiFIVE is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const { userId, points, hifive, team, accountState } = req.body
    try {
      let editUser = await User.findByIdAndUpdate(userId, {
        points,
        hifive,
        team,
        accountState
      })

      let pointsDiff = points - editUser.points

      // When edit team
      if (editUser.team !== team) {
        // Set teamRandom to false
        await User.findByIdAndUpdate(userId, {
          teamRandom: false
        })

        // Edit team member and points
        await Team.findByIdAndUpdate(editUser.team, {
          $inc: { member: -1, points: -editUser.points }
        })

        await Team.findByIdAndUpdate(team, {
          $inc: { member: 1, points: points }
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

      // PUT user return??
      res.json({ success: 'success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route   GET api/users/rank/:points/:hifive
// @desc    Get user rank
// @access  Public
router.get('/rank/:points/:hifive', async (req, res) => {
  try {
    const pointsLess = await User.countDocuments({
      points: {
        $gt: req.params.points
      }
    })
    const hifiveLess = await User.countDocuments({
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
