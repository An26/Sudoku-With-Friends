const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http').Server(app);
const io = require('socket.io')(http);


const config = require('./server/config/config.js')


// Express
const app = express();
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
  console.log('a user connected');
  socket.on('new-message', function(msg){
    console.log(msg);
    io.emit('receive-message', msg);
  })
});

// socket.on('test', function(){
//   console.log('mounted');
// })

// connection to the port
app.listen(config.port, () => {
	console.log('server started on port: ', config.port);
});