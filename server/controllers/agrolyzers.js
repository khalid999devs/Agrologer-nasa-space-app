const { agrolyzers } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const { sendToWebSocketServer } = require('../utils/sendToSocketServer');

const getAgrolyzer = async (req, res) => {
  const userId = req.user.id;
  const result = await agrolyzers.findOne({ where: { userId } });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the agrolyzerData!',
    alerts: result,
  });
};

const updateAgrolyzer = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  await agrolyzers.update(data, { where: { userId } });

  res.json({
    succeed: true,
    msg: 'Successfully updated the agrolyzer data!',
  });
};

const getRecommendationData = async (req, res) => {
  const { sensorData, agrolyzerId } = req.body;
  const userId = req.user.id;
  const targetDevice = await agrolyzers.findOne({
    where: { id: agrolyzerId, userId },
  });
  if (!targetDevice) {
    throw new UnauthorizedError(
      'You are not authorized to use this device analyzer!'
    );
  }
  //post req to python model for the with the sensor data and analyzq it
  //get the todos

  await sendToWebSocketServer({
    type: 'update',
    role: 'server',
    label: 'prediction',
    info: {},
  });

  res.json({
    succeed: true,
    msg: 'Successfully analyzed the data!',
    result: {
      analyzedData: {},
      todos: {},
    },
  });
};

module.exports = { getAgrolyzer, updateAgrolyzer, getRecommendationData };
