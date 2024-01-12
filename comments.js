// Create Web Server with Express
// npm install express --save
// npm install body-parser --save
// npm install mongoose --save
// npm install nodemon --save-dev
// npm install cors --save

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const commentsRoutes = require('./routes/comments');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

// Set up routes
app.use('/api/comments', commentsRoutes);

module.exports = app;