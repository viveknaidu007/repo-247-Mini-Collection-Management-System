const client = require('../config/elasticsearch');

const index = 'notifications';

const createNotification = async (notification) => {
  return client.index({ index, body: notification });
};

const getNotifications = async () => {
  const { body } = await client.search({ index });
  return body.hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
};

module.exports = { createNotification, getNotifications };