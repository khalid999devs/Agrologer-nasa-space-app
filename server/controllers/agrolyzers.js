const { agrolyzers, dashboards } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const { sendToWebSocketServer } = require('../utils/sendToSocketServer');
const { redis } = require('../utils/redis');

const getAgrolyzer = async (req, res) => {
  const userId = req.user.id;
  let mode = req.params.mode;
  let update = req.params.update;

  mode = mode ? JSON.parse(mode) : false;
  update = update ? JSON.parse(update) : true;

  const result = await agrolyzers.findOne({ where: { userId } });
  if (!result) {
    return res.json({
      succeed: false,
      msg: 'No registered device found!',
    });
  }

  if (mode === false) {
    if (update)
      await dashboards.update({ deviceStats: true }, { where: { userId } });
    res.json({
      succeed: true,
      msg: 'Successfully Connected the Agrolyzer!',
      agrolyzer: result,
      connected: update ? true : false,
    });
  } else if (mode === true) {
    if (update)
      await dashboards.update({ deviceStats: false }, { where: { userId } });
    return res.json({
      succeed: true,
      msg: 'Successfully disconnected the Agrolyzer!',
      agrolyzer: result,
      connected: update ? false : true,
    });
  }
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

const getSensorData = async (req, res) => {
  const userId = 1;
  const { connectionData } = req.body;
  let cursor = '0';
  const pattern = `${userId}*`;
  const count = 100;
  let keys = [];

  do {
    const result = await new Promise((resolve, reject) => {
      client.scan(cursor, 'MATCH', pattern, 'COUNT', count, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });

    cursor = result[0];
    keys = keys.concat(result[1]);
  } while (cursor !== '0');

  if (keys.length < 1) {
    return res.json({
      succeed: true,
      msg: 'No sensor data available',
      data: null,
    });
  }

  let latestKey = keys.reduce((latest, current) => {
    const latestTimestamp = parseInt(latest.split('@')[1], 10);
    const currentTimestamp = parseInt(current.split('@')[1], 10);
    return currentTimestamp > latestTimestamp ? current : latest;
  });
  let sensorData = await redis.get(latestKey);
  sensorData = JSON.parse(sensorData);

  const newSensorData = await agrolyzers.create({ sensorData, connectionData });

  res.json({
    succeed: true,
    msg: 'Sensor data available!',
    data: newSensorData,
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

module.exports = {
  getAgrolyzer,
  updateAgrolyzer,
  getRecommendationData,
  getSensorData,
};
