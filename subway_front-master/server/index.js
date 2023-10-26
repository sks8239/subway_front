const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

const path = require('path');
const port = 4000;

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
  socket.on('disconnection', ({ name }) => {
    io.emit('message', { name, message: '님이 나가셨습니다' });
  })
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

// React 애플리케이션의 라우트에 대해 index.html 파일을 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, function () {
  console.log(`${port}번에 포트가 연결되었습니다`);
});