const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const User = require('./models/user-model');
const songRoutes = require('./Routes/application-routes')
const userRoutes = require('./Routes/user-routes');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/users', userRoutes);
app.use('/users/songs', songRoutes);
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

  mongoose.connect('mongodb+srv://yash_sharma:Expert7827@aaapowertech.5mjeafs.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    app.listen(5000);
}).catch(err=>{
    return res.json(new HttpError(
        "Could not connect to server.",
    ))
});


