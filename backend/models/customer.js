
const client = require('../config/elasticsearch');

const index = 'customers';

const createCustomer = async (customer) => {
  return client.index({ index, body: customer });
};

const getCustomers = async () => {
  const { body } = await client.search({ index });
  return body.hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
};

const updateCustomer = async (id, customer) => {
  return client.update({ index, id, body: { doc: customer } });
};

const deleteCustomer = async (id) => {
  return client.delete({ index, id });
};

module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer };