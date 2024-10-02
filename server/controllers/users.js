const {
  users,
  dashboards,
  settings,
  weathers,
  predictions,
  agrolyzers,
  alerts,
} = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const { sendToken } = require('../utils/createToken');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const registerUser = async (req, res) => {
  const userData = req.user;
  if (req.mode === 'update') {
    await users.update(userData);
    return res.json({
      succeed: true,
      msg: 'Successfully updated!',
    });
  }
  const user = await users.create(userData);

  await client.verify.v2
    ?.services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      channel: 'sms',
      to: userData.phoneNum,
    });

  res.json({
    succeed: true,
    msg: 'user created successfully',
    user: user,
  });
};

const loginUser = async (req, res) => {
  const { phoneNum } = req.body;

  let user = await users.findOne({ where: { phoneNum } });

  if (!user) {
    user = await users.create({ phoneNum });
  }
  await client.verify.v2
    ?.services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      channel: 'sms',
      to: user.phoneNum,
    });

  res.json({
    succeed: true,
    msg: 'OTP sent!',
  });
};

const verifyOTP = async (req, res) => {
  const { phoneNum, otp, settingsData, farmerData } = req.body;
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: phone,
      code: otp,
    });
  let user = await users.findOne({ where: { phoneNum } });
  const dashboard = await dashboards.create({ userId: user.id });
  const setting = await settings.create({ ...settingsData, userId: user.id });
  await predictions.create({});
  await weathers.create({});
  await agrolyzers.create({});
  await user.update(farmerData, { where: { id: user.id } });

  if (!user) {
    throw new UnauthenticatedError('Please create an account first!');
  }

  sendToken({ user: { ...user, ...farmerData }, dashboard, setting }, res);
};

const getUser = async (req, res) => {
  const user = req.user;
  const userInfo = await users.findOne({
    include: [
      { model: settings },
      { model: agrolyzers },
      { model: dashboards },
      { model: alerts },
    ],
    where: { id: user.id },
  });
  if (!userInfo) {
    throw new UnauthorizedError('You are not authorized!');
  }

  res.json({
    succeed: true,
    msg: 'Successfully got user!',
    user: userInfo,
  });
};

const updateUser = async (req, res) => {
  const data = req.body;
  await users.update({ ...data }, { where: { id: req.user.id } });

  res.json({
    succeed: true,
    msg: 'Successfully updated',
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyOTP,
  getUser,
  updateUser,
};
