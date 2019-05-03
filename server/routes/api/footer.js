const express = require('express')
const router = express.Router()

// Load Footer model
const Footer = require('../../models/Footer')

// Middleware
const adminAuth = require('../../middlewares/adminAuth')

// @route   GET api/footer
// @desc    Get footer
// @access  Public
router.get('/', async (req, res) => {
  try {
    const footer = await Footer.findOne().sort({ createdAt: -1 })

    res.json(footer)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   PUT api/footer
// @desc    Edit footer
// @access  Admin
router.put('/', adminAuth, async (req, res) => {
  try {
    const footer = await Footer.findOne()
    footer.content = req.body.content

    await footer.save()
    res.json(footer)
  } catch (err) {
    onsole.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
