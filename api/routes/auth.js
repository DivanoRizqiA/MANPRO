const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getProfile, updateProfile, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', register);
router.post('/signin', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Profile management routes (requires auth)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/change-password', auth, changePassword);

module.exports = router;