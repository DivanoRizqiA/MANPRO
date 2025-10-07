const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Ensure a unique index on email
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);