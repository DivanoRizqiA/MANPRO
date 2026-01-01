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

// Import crypto dan email service untuk password reset
const crypto = require('crypto');
const emailService = require('../utils/emailService');

/**
 * Forgot Password - Kirim email reset password
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    console.log('[FORGOT PASSWORD] Request for:', email);

    // Selalu response success untuk hindari account enumeration
    const successMessage = 'Jika email terdaftar, link reset password telah dikirim ke email Anda';

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Email harus diisi' 
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Tetap return success untuk security (hindari enumeration)
      console.log('[FORGOT PASSWORD] Email not found:', email);
      return res.json({ 
        success: true, 
        msg: successMessage 
      });
    }

    // Generate reset token (random 32 bytes -> hex string)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token untuk disimpan di database (security best practice)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token dan expiry (1 jam dari sekarang)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    console.log('[FORGOT PASSWORD] Token generated for:', email);

    // Kirim email dengan token (bukan hashed token)
    try {
      await emailService.sendPasswordResetEmail(
        user.email,
        resetToken, // Kirim token asli, bukan yang di-hash
        user.name || user.email.split('@')[0]
      );
      console.log('[FORGOT PASSWORD] Email sent successfully to:', email);
    } catch (emailError) {
      console.error('[FORGOT PASSWORD] Failed to send email:', emailError);
      // Reset token jika email gagal
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      
      return res.status(500).json({
        success: false,
        msg: 'Gagal mengirim email. Silakan coba lagi.'
      });
    }

    res.json({ 
      success: true, 
      msg: successMessage 
    });

  } catch (err) {
    console.error('[FORGOT PASSWORD] Error:', err);
    res.status(500).json({ 
      success: false, 
      msg: 'Server error. Silakan coba lagi.' 
    });
  }
};

/**
 * Reset Password - Verify token dan update password
 */
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  
  try {
    console.log('[RESET PASSWORD] Attempting password reset');

    if (!token) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Token reset password diperlukan' 
      });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Password minimal 6 karakter' 
      });
    }

    // Hash token yang diterima untuk dicocokkan dengan database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Cari user dengan token yang valid dan belum expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log('[RESET PASSWORD] Invalid or expired token');
      return res.status(400).json({
        success: false,
        msg: 'Token tidak valid atau sudah kadaluarsa. Silakan request reset password baru.'
      });
    }

    console.log('[RESET PASSWORD] Valid token for user:', user.email);

    // Hash password baru
    user.password = await bcrypt.hash(password, 10);
    
    // Hapus reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.updatedAt = new Date();
    
    await user.save();

    console.log('[RESET PASSWORD] Password updated for:', user.email);

    // Kirim email notifikasi password berhasil diubah
    try {
      await emailService.sendPasswordChangedEmail(
        user.email,
        user.name || user.email.split('@')[0]
      );
    } catch (emailError) {
      // Tidak perlu fail jika email notifikasi gagal
      console.error('[RESET PASSWORD] Failed to send confirmation email:', emailError);
    }

    res.json({ 
      success: true, 
      msg: 'Password berhasil direset. Silakan login dengan password baru.' 
    });

  } catch (err) {
    console.error('[RESET PASSWORD] Error:', err);
    res.status(500).json({ 
      success: false, 
      msg: 'Server error. Silakan coba lagi.' 
    });
  }
};