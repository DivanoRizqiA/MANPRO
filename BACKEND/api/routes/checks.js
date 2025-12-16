const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllChecks,
  addCheck,
  deleteAllChecks
} = require('../controllers/checkController');

router.get('/', auth, getAllChecks);
router.post('/', auth, addCheck);
router.delete('/', auth, deleteAllChecks);

module.exports = router;