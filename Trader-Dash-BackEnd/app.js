const express = require("express");
const path = require("path");
var cors=require('cors');
const bodyParser = require("body-parser");
const passport = require("passport"); //Passport is authentication middleware for Node.js
const mongoose = require("mongoose");
const config=require('./config/database'); //return object contain configuration of database
const users = require('./routes/users');
const tradelog = require('./routes/client_stock');
const dash = require('./model/dashboard');
const upload = require('./routes/client_stock');

//Connect to database 
mongoose.connect(config.database, {
     useUnifiedTopology: true,
    useNewUrlParser: true,
     });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});



const app = express();
// app.config('CORS_HEADERS') = 'Content-Type'


//handle all  '/users' request using router middelware


//check which port is avalaible on system
const port =process.env.PORT || 3000;


//bodyParser.json returns middleware that only parses json
app.use(bodyParser.json());
app.use(cors());

//Use passport middleware for authentification
app.use(passport.initialize());
app.use(passport.session());
const auth=require('./config/passport');
auth(passport);

//converting http to https
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
});


//Use router as middleware for routing the details of users
app.use('/users',users);

app.use('/dashboard', dash);


const dashboard=require('./routes/dashboard');
app.use('/dashboard',dashboard);

app.listen(port, () => {
    console.log('Server started on port ' + port);
});


//upload
app.use('/file', upload);


//Other all routes
app.get('*', (req, res) => {
  res.send("...........404:page not found..........");
});

