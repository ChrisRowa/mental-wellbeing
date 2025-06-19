const express = require('express');
const router = express.Router();
const { bookAppointment, acceptAppointment, rejectAppointment, getAppointments } = require('../controllers/appointmentController');

router.post('/book', bookAppointment);
router.post('/accept', acceptAppointment);
router.post('/reject', rejectAppointment);
router.get('/', getAppointments);

module.exports = router; 