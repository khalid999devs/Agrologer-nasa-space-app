const {
  getAlerts,
  addAlert,
  removeAlert,
  updateAlert,
} = require('../controllers/alerts');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getAlerts);
router.post('/add', clientValidate, addAlert);
router.put('/update', clientValidate, updateAlert);
router.delete('/remove/:id', clientValidate, removeAlert);

module.exports = router;
