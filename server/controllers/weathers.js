const { weathers } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const { sendToWebSocketServer } = require('../utils/sendToSocketServer');

const getWeather = async (req, res) => {
  const userId = req.user.id;
  const result = await weathers.findOne({ where: { userId } });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the weather data!',
    weather: result,
  });
};

const updateWeather = async (req, res) => {
  const weatherData = req.body;
  const userId = req.user.id;
  //process the alert data the update based on the user
  //update the predictions data

  await sendToWebSocketServer({
    type: 'update',
    role: 'server',
    label: 'weather',
    info: {},
  });

  res.json({
    succeed: true,
    msg: 'Successfully updated weathers!',
  });
};

module.exports = { getWeather, updateWeather };
