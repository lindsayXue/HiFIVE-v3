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

// Load Validator
const validateRecordInput = require('../../validation/record')

// Middleware
const googleAuth = require('../../middlewares/googleAuth')

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
    if (records.length == 0) {
      errors.norecordsfound = 'No records found'
      return res.status(404).json(errors)
    } else {
      res.json(records)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/records/add
// @desc    Create a record
// @access  Private
router.post('/add', async (req, res) => {
  try {
    const { errors, isValid } = validateRecordInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    let type
    if (req.body.type === 'Other') {
      type = req.body.typeInput
    } else {
      type = req.body.type
    }

    const newRecord = new Record({
      user: req.body.googleId,
      date: req.body.date,
      type,
      duration: req.body.duration,
      points: req.body.points,
      bonus: req.body.bonus
    })

    // let bonus = req.body.bonus.split(',')
    // newRecord.bonus = bonus

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
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/records/user
// @desc    Get user records
// @access  Private
router.get('/user', async (req, res) => {
  try {
    let userRecords
    if (!!req.query.number) {
      let skip = !req.query.skip ? 0 : req.query.skip
      userRecords = await Record.find({ user: req.query.googleId })
        .sort({
          date: -1
        })
        .skip(Number(skip))
        .limit(Number(req.query.number))
    } else {
      userRecords = await Record.find({ user: req.query.googleId }).sort({
        date: -1
      })
    }
    res.json(userRecords)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
