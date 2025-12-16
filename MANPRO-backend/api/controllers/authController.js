const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashed });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Simple placeholder implementations for password reset flow.
// Integrate with your email provider and secure token storage as needed.
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // Respond with success regardless to avoid account enumeration
    if (!user) {
      return res.json({ msg: 'If the email exists, a reset link was sent.' });
    }
    // TODO: Generate reset token, store securely, and send email.
    res.json({ msg: 'Reset link sent (placeholder).' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    // TODO: Verify token, find user, and update password.
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ msg: 'Password too short' });
    }
    // Placeholder: accept request but do not change anything without token logic
    res.json({ msg: 'Password reset successful (placeholder).' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};