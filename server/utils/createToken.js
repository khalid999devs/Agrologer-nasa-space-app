const { sign } = require('jsonwebtoken');

const createJWT = ({ payload, jwtSecret, jwtLifeTime }) => {
  const token = sign(payload, jwtSecret, {
    expiresIn: jwtLifeTime,
  });
  return token;
};

const attachTokenToResponse = (tokenName, { res, token, expiresInDay }) => {
  const tokName = tokenName || 'token';
  const day = 1000 * 60 * 60 * (24 * Number(expiresInDay));
  res.cookie(tokName, token, {
    // domain: `.${process.env.COOKIE_DOMAIN}`,
    httpOnly: true,
    // path: '/',
    expires: new Date(Date.now() + day),
    // secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

const sendToken = async (data, res) => {
  const accessToken = sign({ ...data }, process.env.CLIENT_SECRET, {
    expiresIn: '30d',
  });
  res.status(201).json({
    succeed: true,
    msg: 'Successful!',
    accessToken,
    result: data,
  });
};

module.exports = {
  createJWT,
  attachTokenToResponse,
  sendToken,
};
