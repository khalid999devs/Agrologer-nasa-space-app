const express = require('express');
const { WebSocketServer } = require('ws');
const geolib = require('geolib');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let userMap = new Map();

app.use(cors());

const validateConnection = (token, ws) => {
  try {
    const validClient = jwt.verify(token, process.env.CLIENT_SECRET);
    return validClient;
  } catch (error) {
    userMap.delete(ws);
    ws.close();
    return null;
  }
};

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'auth') {
        const user = validateConnection(data.token, ws);
        const userInfo = { user, location: data.location };
        console.log(user, userInfo);

        if (!user || !user.id) {
          throw new Error('Invalid token');
        }

        userMap.set(ws, userInfo);
      }

      if (data.type === 'community' && data.role === 'chat') {
        userMap.forEach((info, clientWs) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({ msg: data.msg, type: 'community', role: 'chat' })
            );
          }
        });
      } else if (data.type === 'notification' && data.role === 'model') {
        userMap.forEach((info, clientWs) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                notification: data.notification,
                type: 'notification',
                role: 'model',
              })
            );
          }
        });
      } else if (data.type === 'irrigation' && data.role === 'notify') {
        const targetUsers = findNearbyIrrigations(
          data.location.lat,
          data.location.long
        );
        targetUsers.forEach((user) => {
          if (user.ws.readyState === WebSocket.OPEN) {
            user.ws.send(
              JSON.stringify({
                irrigation: data.irrigation,
                type: 'irrigation',
                role: 'notify',
              })
            );
          }
        });
      } else if (data.type === 'update' && data.role === 'server') {
        userMap.forEach((info, clientWs) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                update: data.update,
                type: 'update',
                role: 'server',
              })
            );
          }
        });
      }
    } catch (error) {
      console.log('Failed to parse WebSocket message:', error);
    }
  });

  ws.on('close', (code, reason) => {
    console.log(`WebSocket connection closed: code=${code}, reason=${reason}`);
    userMap.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const findNearbyIrrigations = (userLat, userLon) => {
  const nearbyUsers = [];

  userMap.forEach((info, ws) => {
    const distance = geolib.getDistance(
      { latitude: userLat, longitude: userLon },
      { latitude: info.location.lat, longitude: info.location.long }
    );
    if (distance <= 5000) {
      nearbyUsers.push({ ws, ...info });
    }
  });

  return nearbyUsers;
};

process.on('SIGTERM', () => {
  console.log('Server shutting down...');
  wss.close(() => {
    console.log('WebSocket server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  wss.close(() => {
    console.log('WebSocket server closed.');
    process.exit(0);
  });
});
