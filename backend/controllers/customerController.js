const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../models/customer');
const { createNotification } = require('../models/notification');
const XLSX = require('xlsx');
const { io } = require('../utils/websocket');

const addCustomer = async (req, res) => {
  const customer = { ...req.body, paymentStatus: 'pending', createdAt: new Date() };
  await createCustomer(customer);
  await createNotification({ type: 'New customer added', message: `${customer.name} added`, timestamp: new Date() });
  io.emit('notification', { type: 'New customer added', message: `${customer.name} added` });
  res.status(201).json(customer);
};

const getAllCustomers = async (req, res) => {
  const customers = await getCustomers();
  res.json(customers);
};

const updateCustomer = async (req, res) => {
  await updateCustomer(req.params.id, req.body);
  res.json({ message: 'Customer updated' });
};

const deleteCustomer = async (req, res) => {
  await deleteCustomer(req.params.id);
  res.json({ message: 'Customer deleted' });
};

const uploadCustomers = async (req, res) => {
  const file = req.file;
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const results = [];
  for (const row of data) {
    try {
      await createCustomer({ ...row, paymentStatus: 'pending', createdAt: new Date() });
      results.push({ success: true, name: row.name });
    } catch (error) {
      results.push({ success: false, name: row.name, error: error.message });
    }
  }
  res.json({ results });
};

module.exports = { addCustomer, getAllCustomers, updateCustomer, deleteCustomer, uploadCustomers };