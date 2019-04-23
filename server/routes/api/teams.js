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

// @route   GET api/teams/winner
// @desc    Get team rank
// @access  Public
router.get('/winner', async (req, res) => {
  try {
    const tops = await Team.find()
      .sort({ points: -1 })
      .limit(3)
    const winner = tops.filter(top => top.points !== 0)
    res.json(winner)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/teams/:id
// @desc    Get a team
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const errors = {}
    const team = await Team.findById(req.params.id)
    if (team.length == 0) {
      errors.noteamfound = 'No team found'
      return res.status(400).json(errors)
    }

    res.json(team)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
