const express = require('express')
const router = express.Router()

// Load Team model
const Team = require('../../models/Team')

// @route   GET api/teams
// @desc    Get all teams
// @access  Public
router.get('/', async (req, res) => {
  try {
    const errors = {}
    const teams = await Team.find()
    if (teams.length == 0) {
      errors.noteamfound = 'No team found'
      return res.status(400).json(errors)
    }

    res.json(teams)
  } catch (err) {
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router