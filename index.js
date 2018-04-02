require('dotenv').config();

const app = require('./server/app');
const express = require('express');

app.use('/', (req, res, next) => {
  if(!req.user) {
    res.redirect('/auth/google');
  } else {
    next();
  }
}, express.static('./app'))

// require('./server/routes/lists.js')(app);
