const {
  addDiscussion,
  removeDiscussion,
  getDiscussions,
} = require('../controllers/discussions');
const clientValidate = require('../middlewares/clientTokenVerify');
const upload = require('../middlewares/uploadFile');

const router = require('express').Router();

router.post('/get', clientValidate, getDiscussions);
router.post('/add', clientValidate, upload.array('discussion'), addDiscussion);
// router.post('/add', clientValidate, addDiscussion);
router.delete('/remove/:discussionId', clientValidate, removeDiscussion);

module.exports = router;
