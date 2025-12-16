const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Register attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email dan password harus diisi' });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'Email sudah terdaftar' });
    }

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashed });
    await user.save();
    
    console.log('User registered successfully:', email);

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token, message: 'Registrasi berhasil' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ msg: 'Email atau password salah' });
    }

    console.log('Login successful:', email);
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ token, message: 'Login berhasil' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
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