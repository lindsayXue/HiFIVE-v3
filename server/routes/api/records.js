const express = require('express')
const router = express.Router()

// Load Record model
const Record = require('../../models/Record')

// Load User model
const User = require('../../models/User')

// Load Team model
const Team = require('../../models/Team')

// Load Activity model
const Activity = require('../../models/Activity')

// Middleware
const userAuth = require('../../middlewares/userAuth')

const { check, validationResult } = require('express-validator/check')

// @route   GET api/records
// @desc    Get all records
// @access  Public
router.get('/', async (req, res) => {
  try {
    let records
    if (!!req.params.number) {
      let skip = !req.params.skip ? 0 : req.params.skip
      records = await Record.find()

        .sort({ date: -1 })
        .skip(Number(skip))
        .limit(Number(req.params.number))
        .populate('user', 'name')
    } else {
      records = await Record.find()
        .sort({ createdAt: -1 })
        .populate('user', 'name')
    }
    // if (records.length == 0) {
    //   errors.norecordsfound = 'No records found'
    //   return res.status(404).json(errors)
    // }
    res.json(records)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/records/add
// @desc    Create a record
// @access  Private
router.post(
  '/add',
  userAuth,
  [
    check('date', 'Exercise date is required')
      .not()
      .isEmpty(),
    check('type', 'Exercise type is required')
      .not()
      .isEmpty(),
    check('typeInput', 'Pleaase input exercise type').custom(
      (value, { req }) => {
        if (req.body.type === 'Other' && !value) {
          return false
        }
        return true
      }
    ),
    check('duration', 'Exercise duration is reqruied')
      .not()
      .isEmpty(),
    check(
      'duration',
      'Exercise duration can not be more than 300 minutes'
    ).isInt({ min: 1, max: 300 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const { date, duration, points, bonus } = req.body

    try {
      const user = await User.findOne({ googleId: req.user.googleId })
      let type
      if (req.body.type === 'Other') {
        type = req.body.typeInput
      } else {
        type = req.body.type
      }

      const newRecord = new Record({
        user: user._id,
        date,
        type,
        duration,
        points,
        bonus
      })

      // Add points to user
      const updateUser = await User.findByIdAndUpdate(user._id, {
        $inc: { points: req.body.points }
      })

      // Add points to team
      await Team.findByIdAndUpdate(updateUser.team, {
        $inc: { points: req.body.points }
      })

      // Add points to activity
      await Activity.findOneAndUpdate(
        {},
        {
          $inc: { points: req.body.points }
        }
      )

      await newRecord.save()
      res.json(newRecord)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route   GET api/records/user
// @desc    Get user records
// @access  Private
router.get('/user', userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId })
    let userRecords
    if (!!req.query.number) {
      let skip = !req.query.skip ? 0 : req.query.skip
      userRecords = await Record.find({ user: user._id })
        .sort({
          date: -1
        })
        .skip(Number(skip))
        .limit(Number(req.query.number))
    } else {
      userRecords = await Record.find({ user: user._id }).sort({
        date: -1
      })
    }
    res.json(userRecords)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
