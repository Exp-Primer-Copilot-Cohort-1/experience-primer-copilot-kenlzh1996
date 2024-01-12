// Create Web Server
// Create Comment
// Read Comment
// Update Comment
// Delete Comment

// Import express
const express = require('express');
// Import router
const router = express.Router();
// Import comment model
const Comment = require('../models/Comment');
// Import post model
const Post = require('../models/Post');
// Import user model
const User = require('../models/User');
// Import passport
const passport = require('passport');
// Import validation
const validateComment = require('../validation/comment');

// @route   POST /api/comments/create
// @desc    Create comment
// @access  Private
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Validate comment
    const { errors, isValid } = validateComment(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      // Find post by id
      const post = await Post.findById(req.body.postId);

      // Check if post exists
      if (!post) {
        return res.status(404).json({ post: 'Post not found' });
      }

      // Find user by id
      const user = await User.findById(req.user._id);

      // Check if user exists
      if (!user) {
        return res.status(404).json({ user: 'User not found' });
      }

      // Create comment object
      const comment = new Comment({
        text: req.body.text,
