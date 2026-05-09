const express = require('express');
const authRoutes = require('./authRoutes');
const superRoutes = require('./superRoutes');
const orgRoutes = require('./orgRoutes');
const Organization = require('../models/Organization');
const User = require('../models/User');
const FeatureFlag = require('../models/FeatureFlag');

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    const organizationsCount = await Organization.countDocuments();
    const usersCount = await User.countDocuments();
    const flagsCount = await FeatureFlag.countDocuments();
    res.json({
      status: "OK",
      timestamp: new Date(),
      stats: {
        organizationsCount,
        usersCount,
        flagsCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mounting Sub-routers
router.use('/auth', authRoutes);
router.use('/public', authRoutes); // Public endpoints are also declared here
router.use('/super', superRoutes);
router.use('/org', orgRoutes);

module.exports = router;
