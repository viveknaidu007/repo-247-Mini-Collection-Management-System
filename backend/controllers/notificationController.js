const { getNotifications } = require('../models/notification');

const getAllNotifications = async (req, res) => {
  const notifications = await getNotifications();
  res.json(notifications);
};

module.exports = { getAllNotifications };