const express = require('express')
const router = express.Router()

// Load Team model
const HiFIVE = require('../../models/HiFIVE')

// Load User model
const User = require('../../models/User')

// Load Validator
const validateHiFIVEInput = require('../../validation/hifive')

// @route   GET api/hifives
// @desc    Get all hifives
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    let hifives
    if (!!req.body.number) {
      let skip = !req.body.skip ? 0 : req.body.skip
      hifives = await HiFIVE.find()
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(req.body.number))
        .populate({ path: 'sender', select: 'name' })
        .populate({ path: 'receiver', select: 'name' })
    } else {
      hifives = await HiFIVE.find()
        .sort({ createdAt: -1 })
        .populate({ path: 'sender', select: 'name' })
        .populate({ path: 'receiver', select: 'name' })
    }
    if (hifives.length == 0) {
      errors.nohifivesfound = 'No hifives found'
      return res.status(404).json(errors)
    }
    res.json(hifives)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/hifives/add
// @desc    Add a hifive
// @access  Private
router.post('/add', async (req, res) => {
  try {
    const { errors, isValid } = validateHiFIVEInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    const newHiFIVE = new HiFIVE({
      sender: req.body.sender,
      receiver: req.body.receiver,
      reason: req.body.reason
    })

    // Add hifive point to receiver
    const test = await User.updateMany(
      {
        _id: { $in: req.body.receiver }
      },
      {
        $inc: { hifive: 1 }
      }
    )
    console.log(test)

    await newHiFIVE.save()
    res.json(newHiFIVE)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/hifives/rank
// @desc    Get all users
// @access  Public
router.get('/rank', async (req, res) => {
  try {
    let rank = await User.find({ hifive: { $ne: 0 } }).sort({ hifive: -1 })
    res.json(rank)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
