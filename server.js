'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

// Data functions
const {BlogPosts} = require('./models');

// Log to the HTTP layer
app.use(morgan('common'));

BlogPosts.create('Hello Bloggers!', 'blog blog blog', 'sunny&adam');

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const blog = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(blog);
});




app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});