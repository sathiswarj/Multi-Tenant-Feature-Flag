const FeatureFlag = require('../models/FeatureFlag');

const getFeatureFlags = async (req, res) => {
  try {
    const { orgId } = req.user;
    const flags = await FeatureFlag.find({ orgId });
    res.json(flags.map(f => ({
      flagId: f._id,
      key: f.key,
      name: f.name,
      description: f.description,
      isEnabled: f.isEnabled,
      orgId: f.orgId,
      updatedBy: f.updatedBy,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFeatureFlag = async (req, res) => {
  const { orgId } = req.user;
  const { key, name, description, isEnabled } = req.body;

  if (!key || !name) {
    return res.status(400).json({ error: 'Feature flag key and name are required.' });
  }

  try {
    const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = await FeatureFlag.findOne({ orgId, key: normalizedKey });
    if (existing) {
      return res.status(400).json({ error: `Feature flag with key '${normalizedKey}' already exists in this organization.` });
    }

    const flag = await FeatureFlag.create({
      key: normalizedKey,
      name: name.trim(),
      description: description ? description.trim() : '',
      isEnabled: !!isEnabled,
      orgId,
      updatedBy: req.user.email
    });

    res.status(201).json({
      flagId: flag._id,
      key: flag.key,
      name: flag.name,
      description: flag.description,
      isEnabled: flag.isEnabled,
      orgId: flag.orgId,
      updatedBy: flag.updatedBy,
      createdAt: flag.createdAt,
      updatedAt: flag.updatedAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFeatureFlag = async (req, res) => {
  const { orgId } = req.user;
  const { id } = req.params;
  const { key, name, description, isEnabled } = req.body;

  try {
    const updates = {};
    if (key !== undefined) {
      const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '-');
      const existing = await FeatureFlag.findOne({ orgId, key: normalizedKey, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ error: `Feature flag with key '${normalizedKey}' already exists in this organization.` });
      }
      updates.key = normalizedKey;
    }
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description.trim();
    if (isEnabled !== undefined) updates.isEnabled = !!isEnabled;
    updates.updatedBy = req.user.email;
    updates.updatedAt = new Date();

    const f = await FeatureFlag.findOneAndUpdate({ _id: id, orgId }, updates, { new: true });
    if (!f) {
      return res.status(404).json({ error: 'Feature flag not found or unauthorized.' });
    }

    res.json({
      flagId: f._id,
      key: f.key,
      name: f.name,
      description: f.description,
      isEnabled: f.isEnabled,
      orgId: f.orgId,
      updatedBy: f.updatedBy,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFeatureFlag = async (req, res) => {
  const { orgId } = req.user;
  const { id } = req.params;

  try {
    const f = await FeatureFlag.findOneAndDelete({ _id: id, orgId });
    if (!f) {
      return res.status(404).json({ error: 'Feature flag not found or unauthorized.' });
    }
    res.json({ message: 'Feature flag deleted successfully.', flagId: id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFeatureFlags,
  createFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag
};
