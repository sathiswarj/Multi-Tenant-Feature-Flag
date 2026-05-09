const Organization = require('../models/Organization');
const User = require('../models/User');
const FeatureFlag = require('../models/FeatureFlag');

const getOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find();
    const result = await Promise.all(orgs.map(async (org) => {
      const admins = await User.find({ orgId: org._id, role: 'org_admin' }).select('email');
      const flagsCount = await FeatureFlag.countDocuments({ orgId: org._id });
      return {
        orgId: org._id,
        name: org.name,
        createdAt: org.createdAt,
        admins: admins.map(admin => admin.email),
        flagsCount
      };
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrganization = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Organization name is required.' });
  }

  try {
    const existing = await Organization.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ error: 'Organization with this name already exists.' });
    }

    const org = await Organization.create({ name: name.trim() });
    res.status(201).json({
      orgId: org._id,
      name: org.name,
      createdAt: org.createdAt,
      admins: [],
      flagsCount: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrganizations,
  createOrganization
};
