const { getAlerts, addAlert, removeAlert } = require('../controllers/alerts');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getAlerts);
router.post('/add', clientValidate, addAlert);
router.delete('/remove/:id', clientValidate, removeAlert);

module.exports = router;
