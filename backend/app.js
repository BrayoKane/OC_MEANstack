const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//  register our new router in our  app.js  file
const stuffRoutes = require('../backend/routes/stuff');
const userRoutes = require('../backend/routes/user');

const app = express();

mongoose.connect('mongodb+srv://will:ex6AB1odbncjy0yg@cluster0-8a29a.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then(() =>{
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) =>{
        console.log('Unable to connect to MongoDB Atlas!', error);
    });

// app.use((req, res) => {
//    res.json({ message: 'Your request was successful!' });
// });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// We want to register our router for all requests
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//This tells Express to serve up the static resource  images  (a sub-directory of our base directory,  __dirname )
// whenever it receives a request to the  /images  endpoint
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
