const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./models/http-error');
const Event = require('./models/event-model');
const userRoutes = require('./Routes/event-routes');


const app = express();

app.use(cors());

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

app.use('/events', userRoutes);
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

  mongoose.connect('mongodb+srv://users:users123@cluster0.feary.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(8080);
}).catch(err=>{
    console.log("Cannot connect to server", err);
});


