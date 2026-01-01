const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const auth = require('../middleware/auth');
const { validateAnalysis } = require('../middleware/validate');

/**
 * @route   POST /api/analysis
 * @desc    Analisis data diabetes menggunakan AI
 * @access  Private (memerlukan authentication)
 */
router.post('/', auth, validateAnalysis, analysisController.analyzeDiabetes);

/**
 * @route   POST /api/analysis/diabetes
 * @desc    Alias untuk /api/analysis
 * @access  Private (memerlukan authentication)
 */
router.post('/diabetes', auth, validateAnalysis, analysisController.analyzeDiabetes);

module.exports = router;
