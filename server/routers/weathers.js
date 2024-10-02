const { getWeather, updateWeather } = require('../controllers/weathers');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getWeather);
router.put('/update', clientValidate, updateWeather);

module.exports = router;
