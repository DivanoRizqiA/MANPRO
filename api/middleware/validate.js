const { body, validationResult } = require('express-validator');

/**
 * Middleware untuk handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Validasi untuk registrasi user
 */
const validateRegister = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung minimal 1 angka'),
  handleValidationErrors
];

/**
 * Validasi untuk login user
 */
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password harus diisi'),
  handleValidationErrors
];

/**
 * Validasi untuk update profile
 */
const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nama harus 2-50 karakter'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),
  handleValidationErrors
];

/**
 * Validasi untuk change password
 */
const validateChangePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Password lama harus diisi'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password baru minimal 6 karakter')
    .matches(/\d/)
    .withMessage('Password baru harus mengandung minimal 1 angka'),
  handleValidationErrors
];

/**
 * Validasi untuk diabetes check
 */
const validateDiabetesCheck = [
  body('Pregnancies')
    .isInt({ min: 0, max: 20 })
    .withMessage('Pregnancies harus angka 0-20'),
  body('Glucose')
    .isFloat({ min: 0, max: 500 })
    .withMessage('Glucose harus angka 0-500 mg/dL'),
  body('BloodPressure')
    .isFloat({ min: 0, max: 300 })
    .withMessage('BloodPressure harus angka 0-300 mmHg'),
  body('SkinThickness')
    .isFloat({ min: 0, max: 100 })
    .withMessage('SkinThickness harus angka 0-100 mm'),
  body('Insulin')
    .isFloat({ min: 0, max: 1000 })
    .withMessage('Insulin harus angka 0-1000 mu U/ml'),
  body('Height')
    .isFloat({ min: 50, max: 300 })
    .withMessage('Height harus angka 50-300 cm'),
  body('Weight')
    .isFloat({ min: 10, max: 500 })
    .withMessage('Weight harus angka 10-500 kg'),
  body('DiabetesPedigreeFunction')
    .isFloat({ min: 0, max: 3 })
    .withMessage('DiabetesPedigreeFunction harus angka 0-3'),
  body('Age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age harus angka 1-120 tahun'),
  handleValidationErrors
];

/**
 * Validasi untuk analysis request
 */
const validateAnalysis = [
  body('prediction')
    .optional()
    .isIn([0, 1, '0', '1', 'Negative', 'Positive'])
    .withMessage('Prediction harus 0, 1, Negative, atau Positive'),
  body('risk_percentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Risk percentage harus 0-100'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateDiabetesCheck,
  validateAnalysis
};
