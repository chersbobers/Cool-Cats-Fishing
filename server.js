const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // When a new message arrives
  socket.on('newMessage', (message) => {
    // Broadcast to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
