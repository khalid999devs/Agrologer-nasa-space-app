const { getSetting, updateSetting } = require('../controllers/settings');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getSetting);
router.put('/update', clientValidate, updateSetting);

module.exports = router;
