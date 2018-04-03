require('dotenv').config();

const app = require('./server/app');
const express = require('express');

app.use('/', express.static('./app'))

// require('./server/routes/lists.js')(app);
