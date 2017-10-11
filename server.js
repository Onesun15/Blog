'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

const blogRouter = require('./blogRouter');

// Data functions
const {BlogPosts} = require('./models');

// Log to the HTTP layer
app.use(morgan('common'));

app.use('/blog-posts', blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});