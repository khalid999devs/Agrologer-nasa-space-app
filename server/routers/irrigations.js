const {
  getIrrigationsData,
  addOwnIrrigationData,
  removeIrrigation,
} = require('../controllers/irrigations');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getIrrigationsData);
router.post('/add', clientValidate, addOwnIrrigationData);
router.delete('/remove/:id', clientValidate, removeIrrigation);

module.exports = router;
