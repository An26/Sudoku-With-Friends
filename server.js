const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const config = require('./server/config/config.js')

// Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(morgan('combined'));


// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Express Routes
app.use(express.static('public'));
require('./server/routes/apiRoutes.js')(app);
const authRoutes = require('./server/routes/auth.js');
app.use('/auth', authRoutes);
app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});


// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
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
  socket.on('new-message', function(msg){
    io.emit('receive-message', msg);
  })
});

// connection to the port
http.listen(config.port, () => {
	console.log('server started on port: ', config.port);
});
