const express = require('express')
const router = express.Router()

// Load Activity model
const Activity = require('../../models/Activity')

// Load User model
const User = require('../../models/User')

// Load Validator
const validateActivityInput = require('../../validation/activity')

// @route   GET api/activity
// @desc    Get activity
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    let activity = await Activity.find()
    if (activity.length == 0) {
      errors.noactivity = 'No activity'
      return res.status(400).json(errors)
    }
    res.json(activity[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/activity
// @desc    Add an activity
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { errors, isValid } = validateActivityInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    const users = await User.find()
    const participant = users.length

    const newActivity = new Activity({
      start: req.body.start,
      end: req.body.end,
      participant
    })
    await newActivity.save()
    res.json(newActivity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
