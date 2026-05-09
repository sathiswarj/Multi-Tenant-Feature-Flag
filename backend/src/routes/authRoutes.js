const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/organizations', authController.getPublicOrganizations);
router.get('/check-flag', authController.checkFeatureFlag);

module.exports = router;
