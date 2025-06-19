const express = require('express');
const router = express.Router();
const { getTherapistProfile, updateAvailability, manageAppointments, getTherapistList, getTherapistById, updateProfile, updateSlots, acceptAppointment, rejectAppointment, getMessages } = require('../controllers/therapistController');
const { authenticate } = require('../middleware/auth');

router.get('/profile', getTherapistProfile);
router.put('/availability', updateAvailability);
router.get('/appointments', manageAppointments);
router.get('/', getTherapistList); // For users to view therapists
router.get('/:id', getTherapistById);
router.put('/profile', authenticate, updateProfile);
router.put('/slots', authenticate, updateSlots);
router.post('/accept', authenticate, acceptAppointment);
router.post('/reject', authenticate, rejectAppointment);
router.get('/messages', authenticate, getMessages);

module.exports = router; 