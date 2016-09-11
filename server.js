var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var r = require('rethinkdb');
var rethink = r.connect( {host: 'localhost', port: 28015});

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function updateCursor(cursor, socket) {
  cursor && cursor.each((err, c) => {
    socket.emit('result', {
      result: {
        key: c
      }
    })
  })
}

function watchForChanges(connection, socket) {
  console.log('songs');
  r.table('songs').orderBy({
    index: 'likes'
  }).changes().run(connection)
    .then(cursor => {
      updateCursor(cursor, socket)
    });
}

io.on('connection', socket => {
  console.log('a user connected');

  rethink.then(connection => watchForChanges(connection, socket));

  socket.on('message', data => {
    console.log(data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
    console.log('a user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
