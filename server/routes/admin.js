const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { getUsers, getTherapists, createUser, updateUser, deleteUser, createTherapist, updateTherapist, deleteTherapist, getReports, controlAIContent } = require('../controllers/adminController');

router.get('/users', authenticate, authorize('admin'), getUsers);
router.post('/users', authenticate, authorize('admin'), createUser);
router.put('/users/:id', authenticate, authorize('admin'), updateUser);
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);

router.get('/therapists', authenticate, authorize('admin'), getTherapists);
router.post('/therapists', authenticate, authorize('admin'), createTherapist);
router.put('/therapists/:id', authenticate, authorize('admin'), updateTherapist);
router.delete('/therapists/:id', authenticate, authorize('admin'), deleteTherapist);

router.get('/reports', authenticate, authorize('admin'), getReports);
// router.get('/chatbot', authenticate, authorize('admin'), monitorChatbot); // monitorChatbot intentionally omitted to avoid duplicate
router.post('/ai-content', authenticate, authorize('admin'), controlAIContent);

module.exports = router; 