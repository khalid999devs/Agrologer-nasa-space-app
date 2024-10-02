const { getDashboard, updateDashboard } = require('../controllers/dashboards');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getDashboard);
router.put('/update', clientValidate, updateDashboard);

module.exports = router;
