const express = require('express');
const { processPayment } = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', processPayment);

module.exports = router;