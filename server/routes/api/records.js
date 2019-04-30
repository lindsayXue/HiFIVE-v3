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
const googleAuth = require('../../middlewares/googleAuth')

const { check, oneOf, validationResult } = require('express-validator/check')

// @route   GET api/records
// @desc    Get all records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    let records
    if (!!req.body.number) {
      let skip = !req.body.skip ? 0 : req.body.skip
      records = await Record.find()
        .sort({ date: -1 })
        .skip(Number(skip))
        .limit(Number(req.body.number))
    } else {
      records = await Record.find().sort({ date: -1 })
    }
    // if (records.length == 0) {
    //   errors.norecordsfound = 'No records found'
    //   return res.status(404).json(errors)
    // }
    res.json(records)
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})

// @route   POST api/records/add
// @desc    Create a record
// @access  Private
router.post(
  '/add',
  googleAuth,
  [
    check('date', 'Exercise date is required')
      .not()
      .isEmpty(),
    check('type', 'Exercise type is required')
      .not()
      .isEmpty(),
    oneOf(
      [
        [
          check('typeInput')
            .not()
            .isEmpty()
        ],
        [
          check('type')
            .not()
            .equals('Other')
        ]
      ],
      'Please input exercise type'
    ),
    check(
      'duration',
      'Exercise duration is reqruied and can not more than 300 minutes'
    )
      .isInt({ min: 1, max: 300 })
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { userId, date, duration, points, bonus } = req.body

    try {
      let type
      if (req.body.type === 'Other') {
        type = req.body.typeInput
      } else {
        type = req.body.type
      }

      const newRecord = new Record({
        user: userId,
        date,
        type,
        duration,
        points,
        bonus
      })

      // Add points to user
      const updateUser = await User.findByIdAndUpdate(req.body.googleId, {
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
      res.status(500).send('Server error')
    }
  }
)

// @route   GET api/records/user
// @desc    Get user records
// @access  Private
router.get('/user', googleAuth, async (req, res) => {
  try {
    let userRecords
    if (!!req.query.number) {
      let skip = !req.query.skip ? 0 : req.query.skip
      userRecords = await Record.find({ user: req.query.userId })
        .sort({
          date: -1
        })
        .skip(Number(skip))
        .limit(Number(req.query.number))
    } else {
      userRecords = await Record.find({ user: req.query.userId }).sort({
        date: -1
      })
    }
    res.json(userRecords)
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})

module.exports = router
