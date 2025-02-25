const { updateCustomer } = require('../models/customer');
const { createNotification } = require('../models/notification');
const { io } = require('../utils/websocket');

const processPayment = async (req, res) => {
  const { customerId, amount } = req.body;
  await updateCustomer(customerId, { paymentStatus: 'completed', outstandingAmount: 0 });
  await createNotification({ type: 'Payment received', message: `Payment of ${amount} received`, timestamp: new Date() });
  io.emit('notification', { type: 'Payment received', message: `Payment of ${amount} received` });
  io.emit('paymentUpdate', { customerId, status: 'completed' });
  res.json({ message: 'Payment processed' });
};

module.exports = { processPayment };