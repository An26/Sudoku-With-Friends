const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const playerId = 0;
// const players = {};

const config = require('./server/config/config.js')


// Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(morgan('combined'));


// Express Routes
app.use(express.static('public'));
require('./server/routes/apiRoutes.js')(app);
app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});


// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect( config.database );
const db = mongoose.connection;
db.on("error", function(error) {
   console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
   console.log("Mongoose connection successful.");
});

// socket.io for chat
io.on('connection', function(socket){
    // socket.on('new-player', function(player) {
    //   console.log(player);
    // });
  // console.log('a user connected');
  socket.on('new-message', function(msg){
    console.log(msg);
    io.emit('receive-message', msg);
  })
});

// connection to the port
http.listen(config.port, () => {
	console.log('server started on port: ', config.port);
});