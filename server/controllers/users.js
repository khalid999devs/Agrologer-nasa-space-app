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
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

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
  let mode = 'login';
  if (!user) {
    user = await users.create({ phoneNum });
    mode = 'reg';
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
    mode,
  });
};

const verifyOTP = async (req, res) => {
  const { phoneNum, otp, mode } = req.body;
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: phoneNum,
      code: otp,
    });

  let user = await users.findOne({ where: { phoneNum } });
  let tokenData = {
    id: user.id,
    phoneNum: user.phoneNum,
    userName: user.userName,
    fullName: user.fullName,
  };
  if (mode === 'reg') {
    const dashboard = await dashboards.create({ userId: user.id });
    const setting = await settings.create({ userId: user.id });
    tokenData.dashboard = dashboard;
    tokenData.setting = setting;
    await predictions.create({ userId: user.id });
    await weathers.create({ userId: user.id });
    await agrolyzers.create({ userId: user.id });
    // await user.update(farmerData, { where: { id: user.id } });
  }
  if (!user) {
    throw new UnauthenticatedError('Please create an account first!');
  }

  sendToken(tokenData, res);
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
