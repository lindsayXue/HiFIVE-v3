const express = require('express')
const router = express.Router()

// AdminPost model
const AdminPost = require('../../models/AdminPost')

// Validation
const validateAdminPostInput = require('../../validation/adminpost')

// @route   GET api/adminposts
// @desc    Get admin posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await AdminPost.find().sort({ date: -1 })
    if (posts.length == 0) {
      return res.status(400).json({ nopostsfound: 'No post found' })
    }
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await AdminPost.findById(req.params.id)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   GET api/posts/add
// @desc    Get post by id
// @access  Public
router.post('/add', async (req, res) => {
  try {
    const { errors, isValid } = validateAdminPostInput(req.body)

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors)
    }

    const newPost = new AdminPost({
      title: req.body.title,
      text: req.body.text
    })

    await newPost.save()
    res.json(newPost)
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    await AdminPost.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ servererror: 'Server error' })
  }
})

module.exports = router
