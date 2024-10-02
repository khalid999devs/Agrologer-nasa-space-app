require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const db = require('./models');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//cors
const whitelist = process.env.REMOTE_CLIENT_APP.split(',');
const corOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

app.use('/uploads', express.static(__dirname + '/uploads'));

//routers
app.get('/test', (req, res) => {
  res.json({
    succeed: true,
    msg: 'Successfully connected to the server!',
  });
});

const userRouter = require('./routers/users');
const discussionRouter = require('./routers/discussions');
const alertsRouter = require('./routers/alerts');
const weatherRoute = require('./routers/weathers');
const predictionsRoute = require('./routers/predictions');
const settingsRoute = require('./routers/settings');
const agrolyzerRoute = require('./routers/agrolyzers');
const irrigationRoute = require('./routers/irrigations');
const dashboardRoute = require('./routers/dashboards');

app.use('/api/users', userRouter);
app.use('/api/discussions', discussionRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/weathers', weatherRoute);
app.use('/api/predictions', predictionsRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/setting', settingsRoute);
app.use('/api/irrigations', irrigationRoute);
app.use('/api/agrolyzer', agrolyzerRoute);

//notfound and errors
const errorHandlerMiddleWare = require('./middlewares/errorHandler');
const notFoundMiddleWare = require('./middlewares/notFound');

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

//ports and start
const PORT = process.env.PORT || 8001;
db.sequelize
  .sync()
  .then((_) => {
    console.log(`database connected`);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
