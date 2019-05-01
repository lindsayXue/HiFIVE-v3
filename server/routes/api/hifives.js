const express = require('express')
const router = express.Router()

// Load Team model
const HiFIVE = require('../../models/HiFIVE')

// Load User model
const User = require('../../models/User')

// Middleware
const googleAuth = require('../../middlewares/googleAuth')

const { check, oneOf, validationResult } = require('express-validator/check')

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
    // if (hifives.length == 0) {
    //   errors.nohifivesfound = 'No hifives found'
    //   return res.status(404).json(errors)
    // }
    res.json(hifives)
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/hifives/user
// @desc    Get user hifives
// @access  Private
router.get('/user/:userId', googleAuth, async (req, res) => {
  try {
    let hifives = await HiFIVE.find({ receiver: req.params.userId })
      .sort({ createdAt: -1 })
      .populate({ path: 'sender', select: 'name' })

    res.json(hifives)
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/hifives/add
// @desc    Add a hifive
// @access  Private
router.post(
  '/add',
  googleAuth,
  [
    check('receiver', 'Receiver is required')
      .not()
      .isEmpty(),
    check('reason', 'HiFIVE reason is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const { sender, receiver, reason } = req.body
    try {
      const newHiFIVE = new HiFIVE({
        sender,
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
      re.status(500).json({ errors: { server: { msg: 'Server error' } } })
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
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
