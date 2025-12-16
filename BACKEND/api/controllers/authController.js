const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
    if (err && (err.code === 11000 || err.code === 'E11000')) {
      console.error('Register duplicate error:', err.message);
      return res.status(400).json({ msg: 'Email already registered' });
    }
    console.error('Register error:', err.message || err);
    res.status(500).json({ msg: 'Server error' });
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
    console.error('Login error:', err.message || err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Helper to create nodemailer transport for Mailtrap
function getMailTransport() {
  const host = process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io';
  const port = Number(process.env.MAIL_PORT) || 2525;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    console.warn('Mailtrap credentials (MAIL_USER/MAIL_PASS) are not set. Emails will fail.');
  }

  return nodemailer.createTransport({ host, port, auth: { user, pass } });
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // Always respond with a generic message to prevent email enumeration
    const genericMsg = { msg: 'Jika email terdaftar, tautan reset telah dikirim.' };

    if (!user) {
      return res.json(genericMsg);
    }

    // Create reset token (store hashed version)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Build reset URL pointing to frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:9000';
    const resetUrl = `${frontendUrl}/#/reset-password?token=${resetToken}`;

    // Send email via Mailtrap
    try {
      const transporter = getMailTransport();
      const from = process.env.MAIL_FROM || 'no-reply@diateksi.local';
      await transporter.sendMail({
        from,
        to: email,
        subject: 'Reset Kata Sandi - Diateksi',
        html: `
          <p>Anda menerima email ini karena ada permintaan reset kata sandi untuk akun Anda.</p>
          <p>Klik tautan berikut untuk mereset kata sandi (berlaku 1 jam):</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>Jika Anda tidak meminta reset, abaikan email ini.</p>
        `,
      });
    } catch (mailErr) {
      console.warn('Email send failed (Mailtrap not configured?):', mailErr.message);
      console.log('DEV RESET URL:', resetUrl);
    }

    return res.json(genericMsg);
  } catch (err) {
    console.error('forgotPassword error:', err.message || err);
    res.status(500).send('Server error');
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    if (!token || !password) {
      return res.status(400).json({ msg: 'Token dan password wajib diisi' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Token tidak valid atau telah kedaluwarsa' });
    }

    // Update password and clear reset fields
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ msg: 'Kata sandi berhasil direset' });
  } catch (err) {
    console.error('resetPassword error:', err.message || err);
    res.status(500).send('Server error');
  }
};