const { users } = require('../models');
const {
  UnauthenticatedError,
  BadRequestError,
  UnauthorizedError,
} = require('../errors');

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
  const { fullName, phoneNum } = req.body;
  console.log(fullName, phoneNum);

  if (phoneNum) {
    const username = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;

    const isUser = await users.findOne({
      where: { phoneNum: phoneNum.trim() },
    });
    if (isUser) {
      if (!isUser.fullName) {
        req.mode = 'update';
      } else {
        throw new UnauthorizedError('User already exists!');
      }
    }

    const data = {
      fullName: fullName.trim(),
      phoneNum: phoneNum.trim(),
      userName: username,
      // password: hashedPass,
    };
    req.user = data;

    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  clientRegValidate,
  passwordValidate,
};
