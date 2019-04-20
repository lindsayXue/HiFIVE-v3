const express = require('express')
const router = express.Router()

// Load Record model
const Record = require('../../models/Record')

// Load Validator
const validateRecordInput = require('../../validation/record')

// @route   GET api/records
// @desc    Get all records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    let records
    if (!!req.body.number) {
      records = await Record.find()
        .sort({ date: -1 })
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

    const newRecord = new Record({
      user: req.body.userId,
      date: req.body.date,
      type: req.body.type,
      duration: req.body.duration,
      bonus: req.body.bonus,
      points: req.body.points
    })
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
    if (!!req.body.number) {
      userRecords = await Record.find({ user: req.body.userId })
        .sort({
          date: -1
        })
        .limit(Number(req.body.number))
    } else {
      userRecords = await Record.find({ user: req.body.userId }).sort({
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
