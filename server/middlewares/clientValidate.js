const { clients } = require('../models');
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const deleteFile = require('../utils/deleteFile');
const hashSalt = Number(process.env.SALT);

const passwordValidate = async (req, res, next) => {
  const { id, mode } = req.user;
  const { password } = req.body;
  if (!password) {
  }

  const clientUser = await clients.findByPk(id, {
    attributes: ['password'],
  });
  const match = await compare(password, clientUser.password);
  if (!match) {
    throw new UnauthenticatedError('wrong password entered');
  } else next();
};

const clientRegValidate = async (req, res, next) => {
  const { fullName, phone, password, address, property } = req.body;
  if (fullName && phone) {
    const username = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;

    const data = {
      fullName: fullName.trim(),
      email,
      phone: phone.trim(),
      userName: username,
      // password: hashedPass,
      address,
    };
    req.user = data;
    req.property = property;

    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  clientRegValidate,
  emailValidate,
  passwordValidate,
};
