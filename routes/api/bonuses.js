const express = require('express')
const router = express.Router()

// Load Bonus model
const Bonus = require('../../models/Bonus')

// Load Validator
const validateBonusInput = require('../../validation/bonus')

// @route   GET api/bonuses
// @desc    Get all bonuses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
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
    if (bonuses.length == 0) {
      errors.nobonusesfound = 'No bonuses found'
      return res.status(404).json(errors)
    } else {
      res.json(bonuses)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/bonuses/add
// @desc    Add a bonuse
// @access  Private
router.post('/add', async (req, res) => {
  try {
    const { errors, isValid } = validateBonusInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    const newBonus = new Bonus({
      name: req.body.name,
      points: req.body.points
    })
    await newBonus.save()
    res.json(newBonus)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
