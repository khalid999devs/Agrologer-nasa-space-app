const {
  addDiscussion,
  removeDiscussion,
  getDiscussions,
} = require('../controllers/discussions');
const clientValidate = require('../middlewares/clientTokenVerify');

const router = require('express').Router();

router.get('/get', clientValidate, getDiscussions);
router.post('/add', clientValidate, addDiscussion);
router.delete('/remove/:discussionId', clientValidate, removeDiscussion);

module.exports = router;
