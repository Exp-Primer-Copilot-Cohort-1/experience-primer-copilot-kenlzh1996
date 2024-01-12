// Create Web Server

// Import Express
const express = require('express');
const app = express();
const port = 3000;

// Import Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Import Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Import Model
const Comment = require('./models/comment');

// Import Method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Import Moment
const moment = require('moment');
