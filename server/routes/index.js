const express = require('express')
var router = express.Router()
const users = require('./api/users')
const records = require('./api/records')
const bonuses = require('./api/bonuses')
const activity = require('./api/activity')
const teams = require('./api/teams')
const hifives = require('./api/hifives')
const adminPosts = require('./api/adminPosts')

// User Routes
router.use('/users', users)

// Record Routes
router.use('/records', records)

// Bonus Routes
router.use('/bonuses', bonuses)

// Activity Routes
router.use('/activity', activity)

// Team Routes
router.use('/teams', teams)

// HiFIVE Routes
router.use('/hifives', hifives)

// Admin posts Routes
router.use('/adminposts', adminPosts)

module.exports = router
