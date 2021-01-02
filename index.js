var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bubble', (req, res) => {
    res.sendFile(__dirname + 'bubble/bubble.html');
  });

io.on('connection', (socket) => {
    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
    socket.on('chat', (msg) => {
        io.emit('chat message', msg);
    });
  });

http.listen(8808, () => {
  console.log('listening on *:8808');
});