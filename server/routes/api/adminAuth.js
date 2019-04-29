const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// Load Admin model
const Admin = require('../../models/Admin')

// Load Input Validation
const validateAdminLogin = require('../../validation/adminlogin')

// @route   POST api/admin/register
// @desc    Register admin
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })

    if (admin) {
      errors.username = 'Username already existes'
      return res.status(404).json(errors)
    }

    const newAdmin = new Admin({
      username,
      password
    })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    newAdmin.password = hash

    await newAdmin.save()

    res.json(newAdmin)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   POST api/admin/login
// @desc    Login admin
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = validateAdminLogin(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { username, password } = req.body

    const admin = await Admin.findOne({ username })

    if (!admin) {
      errors.username = 'Username not found'
      return res.status(404).json(errors)
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      errors.password = 'Password incorrect'
      return res.status(404).json(errors)
    }

    // Sign JWT Token
    const payload = { username }
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 })
    res.json({ succedd: true, token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
