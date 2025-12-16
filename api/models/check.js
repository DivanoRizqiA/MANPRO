const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const checkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  // Replace BMI with height and weight
  height: { type: Number, required: true }, // in centimeters
  weight: { type: Number, required: true }, // in kilograms
  bmi: { type: Number }, // Will be calculated automatically
  glucose: Number,
  pregnancies: Number,
  insulin: Number,
  bloodPressure: Number,
  skinThickness: Number,
  diabetesPedigree: Number,
  result: String,
  createdAt: { type: Date, default: Date.now },
  risk: Number,
  riskCategory: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  aiAnalysis: { type: String } // AI analysis from Gemini
});

// Fields to encrypt
const encryptedFields = ['age', 'height', 'weight', 'bmi', 'glucose', 'pregnancies', 'insulin', 'bloodPressure', 'skinThickness', 'diabetesPedigree'];

// Calculate BMI before saving
checkSchema.pre('save', function(next) {
  // Convert height from cm to meters and calculate BMI
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  next();
});

// Encrypt data before saving
checkSchema.pre('save', function(next) {
  encryptedFields.forEach(field => {
    if (this[field]) {
      this[field] = encrypt(this[field].toString());
    }
  });
  next();
});

// Decrypt data when retrieving
checkSchema.post('find', function(docs) {
  docs.forEach(doc => {
    encryptedFields.forEach(field => {
      if (doc[field]) {
        try {
          doc[field] = parseFloat(decrypt(doc[field]));
        } catch (error) {
          console.error(`Error decrypting ${field}:`, error);
        }
      }
    });
  });
});

// Decrypt single document after findOne
checkSchema.post('findOne', function(doc) {
  if (!doc) return;
  
  encryptedFields.forEach(field => {
    if (doc[field]) {
      try {
        doc[field] = parseFloat(decrypt(doc[field]));
      } catch (error) {
        console.error(`Error decrypting ${field}:`, error);
      }
    }
  });
});

module.exports = mongoose.model('Check', checkSchema);
