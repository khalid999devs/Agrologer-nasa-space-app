const WebSocket = require('ws');

const sendToWebSocketServer = (message) => {
  return new Promise((resolve, reject) => {
    const wsClient = new WebSocket('ws://localhost:8080');

    wsClient.on('open', () => {
      // console.log('Connected to WebSocket server');

      wsClient.send(JSON.stringify(message), (err) => {
        if (err) {
          console.error('Failed to send data to WebSocket server:', err);
          reject(err);
        } else {
          console.log('Data sent successfully to WebSocket server');
          resolve('Data sent successfully');
        }

        wsClient.close();
      });
    });

    wsClient.on('error', (error) => {
      console.error('WebSocket error:', error);
      reject(error);
    });
  });
};

module.exports = {
  sendToWebSocketServer,
};
