const express = require('express')
const router = express.Router()

// Load Footer model
const Footer = require('../../models/Footer')

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

// @route   add api/footer
// @desc    Add footer
// @access  Admin
router.post('/', async (req, res) => {
  try {
    const newFooter = new Footer({
      content: req.body.content
    })

    await newFooter.save()
    res.json(newFooter)
  } catch (err) {
    onsole.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
