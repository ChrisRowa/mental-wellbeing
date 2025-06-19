const express = require('express');
const router = express.Router();
const { bookAppointment, acceptAppointment, rejectAppointment, getAppointments, getReminders } = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/auth');

router.post('/book', bookAppointment);
router.post('/accept', acceptAppointment);
router.post('/reject', rejectAppointment);
router.get('/', getAppointments);
router.get('/reminders', authenticate, getReminders);

module.exports = router; 