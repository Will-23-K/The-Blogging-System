const express = require('express');
const { getProfile, updateProfile, updateWordOfDay, toggleFollow } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.route('/word-of-day')
  .put(updateWordOfDay);

router.route('/follow/:userId')
  .post(toggleFollow);

module.exports = router;