const { predictions } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const { sendToWebSocketServer } = require('../utils/sendToSocketServer');

const getPredictions = async (req, res) => {
  const userId = req.user.id;
  const result = await predictions.findOne({ where: { userId } });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the predictions!',
    predictions: result,
  });
};

const updatePredictions = async (req, res) => {
  const predictionsData = req.body;
  const userId = req.user.id;
  //process the alert data the update based on the user
  //update the predictions data

  await sendToWebSocketServer({
    type: 'update',
    role: 'server',
    label: 'prediction',
    info: {},
  });

  res.json({
    succeed: true,
    msg: 'Successfully updated predictions!',
  });
};

module.exports = { getPredictions, updatePredictions };
