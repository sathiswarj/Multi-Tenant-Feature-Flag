const express = require('express');
const orgController = require('../controllers/orgController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken, requireRole('org_admin'));

router.get('/flags', orgController.getFeatureFlags);
router.post('/flags', orgController.createFeatureFlag);
router.put('/flags/:id', orgController.updateFeatureFlag);
router.delete('/flags/:id', orgController.deleteFeatureFlag);

module.exports = router;
