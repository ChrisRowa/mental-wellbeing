const express = require('express');
const router = express.Router();
const { getUserProfile, getBookingHistory, getReminders } = require('../controllers/userController');

router.get('/profile', getUserProfile);
router.get('/bookings', getBookingHistory);
router.get('/reminders', getReminders);

module.exports = router; 