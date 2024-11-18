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
const mailer = require('../utils/sendMail');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const registerUser = async (req, res) => {
  const userData = req.user;
  const { byPassOTP = false } = req.body;

  if (req.mode === 'update') {
    await users.update(userData);
    return res.json({
      succeed: true,
      msg: 'Successfully updated!',
    });
  }
  const user = await users.create(userData);

  if (!byPassOTP) {
    await client.verify.v2
      ?.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({
        channel: 'sms',
        to: userData.phoneNum,
      });
  }
  res.json({
    succeed: true,
    msg: 'user created successfully',
    user: user,
  });
};

const loginUser = async (req, res) => {
  const { phoneNum, byPassOTP = false } = req.body;

  let user = await users.findOne({ where: { phoneNum } });
  let mode = 'login';
  if (!user) {
    user = await users.create({ phoneNum });
    mode = 'reg';
  }
  if (!byPassOTP) {
    await client.verify.v2
      ?.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({
        channel: 'sms',
        to: user.phoneNum,
      });
  }
  res.json({
    succeed: true,
    msg: 'OTP sent!',
    mode,
  });
};

const verifyOTP = async (req, res) => {
  const { phoneNum, otp, mode, byPassOTP = false } = req.body;
  if (!byPassOTP) {
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNum,
        code: otp,
      });
  }

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
    // await agrolyzers.create({ userId: user.id });
    // await user.update(farmerData, { where: { id: user.id } });
  }
  if (!user) {
    throw new UnauthenticatedError('Please create an account first!');
  }

  sendToken(tokenData, res);
};

const sendEmailToClient = async (req, res) => {
  const { fullName, phoneNum } = req.body;

  mailer(
    {
      info: {
        subject: `Agrolyzer Device Request from ${fullName}`,
        body: `I am ${fullName}, I want a registered Agrolyzer device. Please contact me as soon as possible.

Regards,
${fullName},
Phone number: ${phoneNum}
          `,
      },
      client: {
        fullName: 'Agrologer Team',
        email: process.env.AUTHORITY_EMAIL,
      },
    },
    'custom'
  );
  res.json({ succeed: true, msg: 'Device Request Sent!' });
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
  sendEmailToClient,
};
