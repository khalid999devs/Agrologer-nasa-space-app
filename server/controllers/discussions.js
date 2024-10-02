const { users, alerts, discussions } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');
const deleteFile = require('../utils/deleteFile');

const addDiscussion = async (req, res) => {
  let { text, replyTo, time, mentions } = req.body;
  replyTo = replyTo ? JSON.parse(replyTo) : {};
  mentions = mentions ? JSON.parse(mentions) : [];
  const userId = req.user.id;
  const owner = req.user;

  let filesUrl = [];
  if (req.files?.length > 0) {
    filesUrl = req.files.map((file) => {
      return {
        originalname: file.originalname,
        path: file.path,
        filename: file.filename,
      };
    });
  }

  const newDiscussion = {
    owner,
    text,
    type: text && filesUrl.length > 0 ? 'textFile' : text ? 'text' : 'file',
    time,
    replyTo,
    mentions,
    filesUrl,
    userId,
  };

  const dscussion = await discussions.create(newDiscussion);
  let newAlert = null;
  if (replyTo.id) {
    newAlert = await alerts.create({
      userId: replyTo.id,
      title: `${owner.fullName} replied to your message! Have a look.`,
      subtitle: text,
      imageType: 'msg',
      read: false,
    });
  }

  res.json({
    succeed: true,
    alert: newAlert,
    dscussion,
  });
};

const removeDiscussion = async (req, res) => {
  const userId = req.user.id;
  const discussionId = req.params.msgId;
  const discussion = await discussions.findOne({
    where: { id: discussionId, userId },
  });
  if (!discussion) {
    throw new UnauthorizedError('You are not permitted to delete this!');
  }
  discussion.filesUrl.forEach((item) => {
    deleteFile(item.path);
  });
  await discussion.destroy();

  res.json({
    succeed: true,
    msg: 'Successfully deleted discussion!',
  });
};

const getDiscussions = async (req, res) => {
  const { page = 1, limit = 30 } = req.body;
  const offset = (page - 1) * limit;

  const discussionsList = await discussions.findAll({
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
  });

  const totalDiscussions = await discussions.count();

  res.json({
    succeed: true,
    discussions: discussionsList,
    total: totalDiscussions,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  });
};

module.exports = { addDiscussion, getDiscussions, removeDiscussion };
