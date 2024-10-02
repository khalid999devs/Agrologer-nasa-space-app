const { alerts } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');

const getAlerts = async (req, res) => {
  const userId = req.user.id;
  const result = await alerts.findAll({ where: { userId } });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the alerts!',
    alerts: result,
  });
};

const addAlert = async (req, res) => {
  const alertData = req.body;
  const userId = req.user.id;
  //process the alert data the update based on the user
  const newAlert = await alerts.create({ ...alertData, userId });

  res.json({
    succeed: true,
    msg: 'Successfully created the notification!',
    alert: newAlert,
  });
};

const removeAlert = async (req, res) => {
  const alertId = req.params.id;
  await alerts.destroy({ where: { id: alertId } });

  res.json({
    succeed: true,
    msg: 'Successfully deleted the alert!',
  });
};

module.exports = { getAlerts, addAlert, removeAlert };
