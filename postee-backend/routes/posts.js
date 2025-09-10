// postee-backend/routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Public feed
router.get('/', postController.getAllPosts);

// Protected routes
router.get('/mine', protect, postController.getMyPosts);
router.post('/', protect, postController.createPost);

// Single post
router.get('/:id', postController.getPost);

// Update / delete (protected)
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router; // ✅ Must export the router directly

