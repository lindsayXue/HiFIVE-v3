const express = require('express')
const router = express.Router()

// AdminPost model
const AdminPost = require('../../models/AdminPost')

// User model
const User = require('../../models/User')

// @route   GET api/adminposts
// @desc    Get admin posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await AdminPost.find().sort({ date: -1 })
    // if (posts.length == 0) {
    //   return res.status(400).json({ nopostsfound: 'No post found' })
    // }
    res.json(posts)
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   GET api/adminposts/:id
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
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   POST api/adminposts/add
// @desc    Add a post
// @access  Admin
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
      url: req.body.url
    })

    await newPost.save()
    res.json(newPost)
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route   DELETE api/adminposts/:id
// @desc    Delete post
// @access  Admin
router.delete('/:id', async (req, res) => {
  try {
    await AdminPost.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    re.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// // @route   POST api/adminposts/like/:id
// // @desc    Like post
// // @access  Private
// router.post('/like/:id', async (req, res) => {
//   try {
//     const post = await AdminPost.findById(req.params.id)
//     if (
//       post.likes.filter(like => like.user.toString() === req.body.googleId)
//         .length > 0
//     ) {
//       return res
//         .status(400)
//         .json({ alreadyliked: 'User already liked this post' })
//     }

//     post.likes.unshift({ user: req.body.googleId })
//     await post.save()
//     res.json(post)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ servererror: 'Server error' })
//   }
// })

// // @route   POST api/adminposts/unlike/:id
// // @desc    Unlike post
// // @access  Private
// router.post('/unlike/:id', async (req, res) => {
//   try {
//     const post = await AdminPost.findById(req.params.id)
//     if (
//       post.likes.filter(like => like.user.toString() === req.body.googleId)
//         .length === 0
//     ) {
//       return res.status(400).json({ notliked: 'You have not liked this post' })
//     }

//     // Get remove index
//     const removeIndex = post.likes.map(like =>
//       like.user.toString().indexOf(req.body.googleId)
//     )

//     // Splice out of array
//     post.likes.splice(removeIndex, 1)

//     await post.save()
//     res.json(post)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ servererror: 'Server error' })
//   }
// })

// // @route   POST api/adminposts/comment/:id
// // @desc    Comment post
// // @access  Private
// router.post('/comment/:id', async (req, res) => {
//   try {
//     const { errors, isValid } = validateAdminPostComment(req.body)

//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors)
//     }

//     const newComment = {
//       user: req.body.googleId,
//       text: req.body.text
//     }
//     const post = await AdminPost.findById(req.params.id)
//     post.comments.unshift(newComment)
//     await post.save()
//     res.json(post)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ servererror: 'Server error' })
//   }
// })

// // @route   DELETE api/posts/comment/:id/:comment_id
// // @desc    Remove comment from post
// // @access  Private
// router.delete('/comment/:id/:comment_id', async (req, res) => {
//   try {
//     const post = await AdminPost.findById(req.params.id)
//     // Check to see if comment exists
//     if (
//       post.comments.filter(
//         comment => comment._id.toString() === req.params.comment_id
//       ).length === 0
//     ) {
//       return res
//         .status(404)
//         .json({ commentnotexists: 'Comment does not exist' })
//     }

//     // Get remove index
//     const removeIndex = post.comments
//       .map(item => item._id.toString())
//       .indexOf(req.params.comment_id)

//     // Splice comment out of array
//     post.comments.splice(removeIndex, 1)

//     await post.save()
//     res.json(post)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ servererror: 'Server error' })
//   }
// })

module.exports = router
