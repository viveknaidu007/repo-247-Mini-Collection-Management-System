let io;

const initWebSocket = (socketIo) => {
  io = socketIo;
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
};

module.exports = { initWebSocket, io };