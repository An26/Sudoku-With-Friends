const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});
// app.use('/create', publish);


// database config
// mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/sudoku' );
// const db = mongoose.connection;
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });
// Once logged in to the db through mongoose, log a success message
// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });


// connection to the port
app.listen(PORT, () => {
	console.log('server started on port: ', PORT);
});