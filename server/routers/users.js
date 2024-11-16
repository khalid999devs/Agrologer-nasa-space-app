const {
  registerUser,
  getUser,
  updateUser,
  loginUser,
  verifyOTP,
  sendEmailToClient,
} = require('../controllers/users');
const clientValidate = require('../middlewares/clientTokenVerify');
const { clientRegValidate } = require('../middlewares/clientValidate');

const router = require('express').Router();

router.post('/register', clientRegValidate, registerUser);
router.post('/otp-send', verifyOTP);
router.post('/login', loginUser);

router.get('/get-user', clientValidate, getUser);

router.put('/update', clientValidate, updateUser);

router.post('/send-device-request', clientValidate, sendEmailToClient);

module.exports = router;
