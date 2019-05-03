const express = require('express')
const router = express.Router()

// Load Activity model
const Activity = require('../../models/Activity')

// Load User model
const User = require('../../models/User')

// Middleware
const adminAuth = require('../../middlewares/adminAuth')

const { check, validationResult } = require('express-validator/check')

// @route   GET api/activity
// @desc    Get activity
// @access  Public
router.get('/', async (req, res) => {
  try {
    let activity = await Activity.findOne()
    res.json(activity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/activity
// @desc    Add an activity
// @access  Admin
router.post(
  '/',
  adminAuth,
  [
    check('start', 'Start date is required')
      .not()
      .isEmpty(),
    check('duration', 'Duration days is required')
      .not()
      .isEmpty(),
    check('duration', 'Duration days must be more than 0').isInt({ min: 1 }),
    check('end', 'End date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const users = await User.find()
      const participants = users.length

      const newActivity = new Activity({
        start: req.body.start,
        end: req.body.end,
        participants
      })
      await newActivity.save()
      res.json(newActivity)
    } catch (err) {
      console.log(err)
      res.status(500).json({ servererror: 'Server error' })
    }
  }
)

// @route   PUT api/activity
// @desc    PUT an activity
// @access  Admin
router.put('/', adminAuth, async (req, res) => {
  try {
    const activity = await Activity.findOne()
    if (activity.status === 'running') {
      activity.status = 'stop'
    } else {
      activity.status = 'running'
    }

    await activity.save()
    res.json(activity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
