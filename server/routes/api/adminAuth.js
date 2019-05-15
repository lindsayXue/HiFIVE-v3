const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
// Load Admin model
const Admin = require('../../models/Admin')

// Middleware
const adminAuth = require('../../middlewares/adminAuth')

const config = require('config')

// @route   GET api/admin/auth
// @desc    Get admin auth
// @access  Public
router.get('/auth', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    res.json(admin)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

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

    // Hash passpord in DB schema
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password, salt)
    // newAdmin.password = hash

    await newAdmin.save()

    res.json(newAdmin)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/admin/login
// @desc    Login admin
// @access  Public
router.post(
  '/login',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const { username, password } = req.body
      const admin = await Admin.findOne({ username })

      if (!admin) {
        errors.username = 'Username not found'
        return res
          .status(404)
          .json({ errors: { username: { msg: 'Username not found' } } })
      }

      // Check Password
      const isMatch = await bcrypt.compare(password, admin.password)

      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: { password: { msg: 'Password incorrect' } } })
      }

      // Sign JWT Token
      const payload = {
        user: {
          id: admin._id
        }
      }
      const token = jwt.sign(payload, config.get('jwtSecretAdmin'), {
        expiresIn: 3600 // 24 hours
      })
      res.json({ succedd: true, token })
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
