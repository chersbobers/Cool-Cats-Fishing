import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('New user connected');
      
      // Get current user count
      const userCount = io.engine.clientsCount;
      io.emit('userCount', userCount);

      socket.on('newMessage', (message) => {
        io.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('userCount', io.engine.clientsCount);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
