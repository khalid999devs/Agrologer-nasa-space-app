const { irrigations } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');

const getIrrigationsData = async (req, res) => {
  const userId = req.user.id;
  const { farmerLoction, fieldLocation } = req.body;
  const ownIrrigationsData = await irrigations.findOne({ where: { userId } });
  //analyze with farmer and firld locations with nearbyirrigations data and get the nearest ones
  const allIrrigationsData = await irrigations.findAll({});

  res.json({
    succeed: true,
    msg: 'Successfully fetched the alerts!',
    result: {
      ownIrrigation: ownIrrigationsData,
      nearBy: [],
    },
  });
};

const addOwnIrrigationData = async (req, res) => {
  const irrigationData = req.body;
  const userId = req.user.id;
  //process the alert data the update based on the user
  const newIrrigation = await irrigations.create({ ...irrigationData, userId });

  //analze the location with others and send the exact notifications to those needs

  res.json({
    succeed: true,
    msg: 'Successfully created the notification!',
    result: newIrrigation,
  });
};

const removeIrrigation = async (req, res) => {
  const irrigationId = req.params.id;
  const userId = req.user.id;
  await irrigations.destroy({ where: { id: irrigationId, userId } });

  res.json({
    succeed: true,
    msg: 'Successfully deleted the alert!',
  });
};

module.exports = { getIrrigationsData, addOwnIrrigationData, removeIrrigation };
