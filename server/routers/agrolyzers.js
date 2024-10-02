const {
  getAgrolyzer,
  updateAgrolyzer,
  getRecommendationData,
} = require('../controllers/agrolyzers');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getAgrolyzer);
router.put('/update', clientValidate, updateAgrolyzer);
router.post('/analyzeData', clientValidate, getRecommendationData);

module.exports = router;
