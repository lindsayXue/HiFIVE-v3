const express = require('express')
const router = express.Router()

// Load Team model
const HiFIVE = require('../../models/HiFIVE')

// Load User model
const User = require('../../models/User')

// Middleware
const userAuth = require('../../middlewares/userAuth')

const { check, validationResult } = require('express-validator/check')

// @route   GET api/hifives
// @desc    Get all hifives
// @access  Public
router.get('/', async (req, res) => {
  try {
    let hifives
    if (!!req.body.number) {
      let skip = !req.body.skip ? 0 : req.body.skip
      hifives = await HiFIVE.find()
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(req.body.number))
        .populate('sender', 'name')
        .populate('receiver', 'name')
    } else {
      hifives = await HiFIVE.find()
        .sort({ createdAt: -1 })
        .populate('sender', 'name')
        .populate('receiver', 'name')
    }
    // if (hifives.length == 0) {
    //   errors.nohifivesfound = 'No hifives found'
    //   return res.status(404).json(errors)
    // }
    res.json(hifives)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/hifives/user
// @desc    Get user hifives
// @access  Private
router.get('/user', userAuth, async (req, res) => {
  const { id } = req.user
  try {
    let hifives = await HiFIVE.find({ receiver: id })
      .sort({ createdAt: -1 })
      .populate('sender', ['name'])

    res.json(hifives)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/hifives/add
// @desc    Add a hifive
// @access  Private
router.post(
  '/add',
  userAuth,
  [
    check('receiver', 'Receiver is required')
      .not()
      .isEmpty(),
    check('reason', 'HiFIVE reason is required')
      .not()
      .isEmpty(),
    check(
      'reason',
      'HiFIVE reason can not be more than 50 characters'
    ).isLength({
      max: 50
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const { receiver, reason } = req.body
    const { id } = req.user
    try {
      const newHiFIVE = new HiFIVE({
        sender: id,
        receiver,
        reason
      })

      // Add hifive point to receiver
      await User.updateMany(
        {
          _id: { $in: receiver }
        },
        {
          $inc: { hifive: 1 }
        }
      )

      await newHiFIVE.save()
      res.json(newHiFIVE)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route   GET api/hifives/rank
// @desc    Get all users
// @access  Public
router.get('/rank', async (req, res) => {
  try {
    let rank = await User.find({ hifive: { $ne: 0 } })
      .sort({ hifive: -1 })
      .select('-googleId')
    res.json(rank)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
