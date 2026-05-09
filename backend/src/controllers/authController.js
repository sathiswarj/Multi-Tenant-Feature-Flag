const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Organization = require('../models/Organization');
const FeatureFlag = require('../models/FeatureFlag');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-123';
const SUPER_ADMIN_EMAIL = 'superadmin@featureflag.com';
const SUPER_ADMIN_PASSWORD = 'superpassword123';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() && password === SUPER_ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: SUPER_ADMIN_EMAIL, role: 'super_admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        token,
        role: 'super_admin',
        email: SUPER_ADMIN_EMAIL,
        name: 'Super Administrator'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const org = await Organization.findById(user.orgId);
    const token = jwt.sign(
      { id: user._id, email: user.email, role: 'org_admin', orgId: user.orgId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role: 'org_admin',
      email: user.email,
      orgId: user.orgId,
      orgName: org ? org.name : 'Unknown Organization'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password, orgId } = req.body;

  if (!email || !password || !orgId) {
    return res.status(400).json({ error: 'Email, password, and organization selection are required.' });
  }

  try {
    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ error: 'Selected organization does not exist.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      orgId,
      role: 'org_admin'
    });

    res.status(201).json({
      message: 'Signup successful! Please log in.',
      user: {
        userId: user._id,
        email: user.email,
        orgId: user.orgId,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPublicOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs.map(org => ({ orgId: org._id, name: org.name })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkFeatureFlag = async (req, res) => {
  const { orgId, key } = req.query;

  if (!orgId || !key) {
    return res.status(400).json({ error: 'orgId and key query parameters are required.' });
  }

  try {
    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found.' });
    }

    const flag = await FeatureFlag.findOne({
      orgId,
      key: key.trim()
    });

    res.json({
      key,
      orgId,
      orgName: org.name,
      isEnabled: flag ? flag.isEnabled : false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
  getPublicOrganizations,
  checkFeatureFlag
};
