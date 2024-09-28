const express = require('express');
const { WebSocketServer } = require('ws');
const geolib = require('geolib');

const app = express();
const PORT = 3000;

// Store driver locations
let farmers = {};

// Create WebSocket server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received message:', data); // Debugging line

      if (data.type === 'community' && data.role === 'chat') {
      }

      if (data.type === 'searchIrrigation' && data.role === 'farmer') {
      }

      if (data.type === 'sellIrrigation' && data.role === 'seller') {
      }
    } catch (error) {
      console.log('Failed to parse WebSocket message:', error);
    }
  });
});

const findNearbyIrrigations = (userLat, userLon) => {
  return Object.entries(drivers)
    .filter(([id, location]) => {
      const distance = geolib.getDistance(
        { latitude: userLat, longitude: userLon },
        location
      );
      return distance <= 5000; // 5 kilometers
    })
    .map(([id, location]) => ({ id, ...location }));
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
