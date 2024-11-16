const { settings, users } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');

const getSetting = async (req, res) => {
  const userId = req.user.id;
  const setting = await settings.findOne({ where: { userId } });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the alerts!',
    setting,
  });
};

const updateSetting = async (req, res) => {
  const userId = req.user.id;
  const { updateData, settingsId } = req.body;

  await settings.update(updateData, { where: { id: settingsId, userId } });

  res.json({
    succeed: true,
    msg: 'Successfully updated the settings!',
  });
};

module.exports = { getSetting, updateSetting };
