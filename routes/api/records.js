const express = require('express')
const router = express.Router()

// Load Records model
const Records = require('../../models/Record')

// @route   GET api/records
// @desc    Get all records
// @access  Public
router.get('/', async (req, res) => {
  try {
    if (!!req.body.number) {
      let records = await Record.find()
        .sort({ date: -1 })
        .limit(req.body.number)
    } else {
      let records = await Record.find().sort({ date: -1 })
    }
    return res.json(records)
  } catch (err) {
    return res.status(404).json({ norecordsfound: 'No records found' })
  }
})

// @route   POST api/records/add
// @desc    Post a record
// @access  Private

module.exports = router
