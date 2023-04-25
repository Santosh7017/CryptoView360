const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const passportJWt = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

// setting cookie parser in middleware
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(session({
    name: 'BeeSocial',
    // todo change secret before deployment in production mode
    secret: process.env.sessionSecret,
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge : (1000 * 60 * 100)
     },
   
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/cryptoView360'
        })
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
    }

    console.log("Server is running on port :", port);
});


