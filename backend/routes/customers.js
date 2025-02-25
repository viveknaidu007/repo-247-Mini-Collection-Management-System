const express = require('express');
const { addCustomer, getAllCustomers, updateCustomer, deleteCustomer, uploadCustomers } = require('../controllers/customerController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.use(auth);
router.post('/', addCustomer);
router.get('/', getAllCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.post('/upload', upload.single('file'), uploadCustomers);

module.exports = router;