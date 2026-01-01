const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validateDiabetesCheck } = require('../middleware/validate');
const {
  getAllChecks,
  addCheck,
  deleteAllChecks,
  deleteCheckById
} = require('../controllers/checkController');

router.get('/', auth, getAllChecks);
router.post('/', auth, validateDiabetesCheck, addCheck);
router.delete('/', auth, deleteAllChecks);
router.delete('/:id', auth, deleteCheckById);

module.exports = router;