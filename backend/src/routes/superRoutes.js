const express = require('express');
const superController = require('../controllers/superController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken, requireRole('super_admin'));

router.get('/organizations', superController.getOrganizations);
router.post('/organizations', superController.createOrganization);

module.exports = router;
