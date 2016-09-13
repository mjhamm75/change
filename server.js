var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var r = require('rethinkdb');
var rethink = r.connect( {host: 'localhost', port: 28015});

app.use(express.static('public'));

app.get('/upvote/:songId', (req, response) => {
  var songId = req.params.songId;
  console.log(songId)
  var song = rethink.then(connection => r.table('songs').get(songId).run(connection).then(res => {
    var likes = res.likes + 1;
    r.table('songs').get(songId).update({
      likes: likes
    }).run(connection).then(result => {
      var updatedSong = res;
      res.likes = res.likes + 1;
      response.json(res);
    })
  }));
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function updateCursor(cursor, socket) {
  cursor && cursor.each((err, c) => {
    emit(socket, c, 'update')
  })
}

function emit(socket, result, name) {
  socket.emit(name, {
    result
  })
}

function watchForChanges(connection, socket) {
  console.log('songs');
  r.table('songs').orderBy({
    index: 'likes'
  }).run(connection)
    .then(cursor => {
      cursor.toArray((err, result) => {
        var resultObj = result.reduce((acc, curr) => {
          return Object.assign(acc, {[curr.id]: curr});
        }, {})
        emit(socket, resultObj, 'initialResult')
      })
    })

  r.table('songs').changes().run(connection)
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
