const express = require('express')
var router = express.Router()
const auth = require('./api/auth')
const users = require('./api/users')
const records = require('./api/records')
const bonuses = require('./api/bonuses')
const activity = require('./api/activity')
const teams = require('./api/teams')
const hifives = require('./api/hifives')
const adminPosts = require('./api/adminPosts')
const adminAuth = require('./api/adminAuth')

// Auth Routes
router.use('/auth', auth)

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

// Admin auth Routes
router.use('/admin', adminAuth)

module.exports = router
