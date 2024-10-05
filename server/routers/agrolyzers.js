const {
  getAgrolyzer,
  updateAgrolyzer,
  getRecommendationData,
  getSensorData,
} = require('../controllers/agrolyzers');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getAgrolyzer);
router.post('/get-sensor-data', clientValidate, getSensorData);
router.put('/update', clientValidate, updateAgrolyzer);
router.post('/analyzeData', clientValidate, getRecommendationData);

module.exports = router;
