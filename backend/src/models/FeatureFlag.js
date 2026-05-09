const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FeatureFlagSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  key: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  isEnabled: {
    type: Boolean,
    default: false
  },
  orgId: {
    type: String,
    ref: 'Organization',
    required: true
  },
  updatedBy: {
    type: String,
    default: 'org_admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

FeatureFlagSchema.index({ key: 1, orgId: 1 }, { unique: true });

module.exports = mongoose.model('FeatureFlag', FeatureFlagSchema);
