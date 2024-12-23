const { dashboards, users } = require('../models');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');

const getDashboard = async (req, res) => {
  const userId = req.user.id;
  const dashboardId = req.params.dashboardId;
  const result = await dashboards.findOne({
    where: { userId, id: dashboardId },
  });
  res.json({
    succeed: true,
    msg: 'Successfully fetched the dashboards!',
    dashboard: result,
  });
};

const updateDashboard = async (req, res) => {
  const userId = req.user.id;
  const { dashboardId } = req.body;
  const user = await users.findOne({ where: { id: userId } });
  let dashboard = await dashboards.findOne({
    where: { userId, id: dashboardId },
  });
  //use userData to analyze perfect dashboard data using ai endpoint req
  //process the alert data the update based on the user
  await dashboard.save();

  res.json({
    succeed: true,
    msg: 'Successfully updated the dashboard!',
    dashboard,
  });
};

module.exports = { getDashboard, updateDashboard };
