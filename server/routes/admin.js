const express = require('express');
const router = express.Router();
const { manageUsers, manageTherapists, monitorChatbot, viewReports, controlAIContent } = require('../controllers/adminController');

router.get('/users', manageUsers);
router.get('/therapists', manageTherapists);
router.get('/chatbot', monitorChatbot);
router.get('/reports', viewReports);
router.post('/ai-content', controlAIContent);

module.exports = router; 