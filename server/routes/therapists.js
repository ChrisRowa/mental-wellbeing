const express = require('express');
const router = express.Router();
const { getTherapistProfile, updateAvailability, manageAppointments, getTherapistList } = require('../controllers/therapistController');

router.get('/profile', getTherapistProfile);
router.put('/availability', updateAvailability);
router.get('/appointments', manageAppointments);
router.get('/', getTherapistList); // For users to view therapists

module.exports = router; 