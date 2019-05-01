const express = require('express')
const router = express.Router()

// Load Bonus model
const Bonus = require('../../models/Bonus')

const { check, oneOf, validationResult } = require('express-validator/check')

// @route   GET api/bonuses
// @desc    Get all bonuses
// @access  Public
router.get('/', async (req, res) => {
  try {
    let bonuses
    if (!!req.body.number) {
      let skip = !req.body.skip ? 0 : req.body.skip
      bonuses = await Bonus.find()
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(req.body.number))
    } else {
      bonuses = await Bonus.find().sort({ createdAt: -1 })
    }

    res.json(bonuses)
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/bonuses/add
// @desc    Add a bonuse
// @access  Private
router.post(
  '/add',
  [
    check('name', 'Bonus name is required')
      .not()
      .isEmpty(),
    check('points', 'Bonus points is required')
      .not()
      .isEmpty(),
    check('points', 'Bonus points must be more than 0').isInt({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    const { name, points } = req.body
    try {
      const newBonus = new Bonus({
        name,
        points
      })
      await newBonus.save()
      res.json(newBonus)
    } catch (err) {
      console.log(err)
      re.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
