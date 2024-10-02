const {
  getPredictions,
  updatePredictions,
} = require('../controllers/predictions');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getPredictions);
router.put('/update', clientValidate, updatePredictions);

module.exports = router;
