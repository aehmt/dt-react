var express = require('express')
var webpack = require('webpack')
var path = require('path')
var bodyParser = require('body-parser')
var config = require('./webpack.dev.config')
var open = require('open')

const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

var jsonParser = bodyParser.json();
app.use(jsonParser)

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './index.html'));
});

const server = app.listen(process.env.PORT || port, function(err) {
  // if (err) {
  //   console.log(err);
  // }
});

const io = require('socket.io')(server);

io.sockets.on('connect', (socket) => {
  console.log('a user connected');
  let room;
  socket.on('subscribe', (data) => {
    socket.join(data.room)
    console.log("joined room " + data.room)
    room = data.room;
  })
  socket.on('unsubscribe', (data) => {
    socket.leave(data.room)
  })
  socket.on('draw', (drawCoords) => {
    console.log('draw from client');
    io.to(room).emit('draw', drawCoords);
  });
});
