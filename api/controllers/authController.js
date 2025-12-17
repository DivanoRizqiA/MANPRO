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

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || user.email.split('@')[0]
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update user profile (name and email)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    
    if (!name && !email) {
      return res.status(400).json({ msg: 'Minimal harus update name atau email' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    
    // Check if new email already exists (if changing email)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email sudah terdaftar' });
      }
      user.email = email;
    }
    
    if (name) {
      user.name = name;
    }
    
    user.updatedAt = new Date();
    await user.save();
    
    console.log('Profile updated for user:', userId);
    res.json({
      success: true,
      message: 'Profil berhasil diperbarui',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ msg: 'Password lama dan baru harus diisi' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Password baru minimal 6 karakter' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }
    
    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password lama tidak sesuai' });
    }
    
    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.updatedAt = new Date();
    await user.save();
    
    console.log('Password changed for user:', userId);
    res.json({
      success: true,
      message: 'Password berhasil diubah'
    });
  } catch (err) {
    console.error('Change password error:', err);
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