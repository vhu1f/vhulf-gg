let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const fs = require('fs');
const { forEach } = require('methods');
const path = require('path');
const util = require('util');

const readDir = util.promisify(fs.readdir);

app.set("view engine", "ejs");
app.use('/', express.static(path.join(__dirname, 'public'), {
  setHeaders: function(res, path) {
    res.set("Pragma-directive: no-cache");
    res.set("Cache-directive: no-cache");
    res.set("Cache-control: no-cache");
    res.set("Pragma: no-cache");
    res.set("Expires: 0");
  }
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bubble', (req, res) => {
  res.sendFile(__dirname + '/bubble/bubble.html');
});

app.get('/bubbPanel', async (req, res) => {
  var imageFileList = [];
  let files = await readDir('public/images/');

  res.render('bubbPanel', {images: files});
});

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat message', msg);
        if (msg == "lol") {
          io.emit('bubble', 'images/webex-lolxd.gif');
        } else if (msg == "astro") {
          io.emit('bubble', 'images/astro.jpg');
        }
    });

    socket.on('bubbPlz', (bub) => {
      io.emit('bubble', bub);
    });
  });

http.listen(8808, () => {
  console.log('listening on *:8808');
});