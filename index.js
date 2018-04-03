require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Express middleware
 */
app.use(require('cookie-parser')());
app.use(require('body-parser').json({}));
app.use(require('body-parser').urlencoded({ extended: true }));

/**
 * Get a reference to the database
 */
const db = require('./server/database');

/**
 * Passport authentication middleware
 */
require('./server/passport')(app, db);

/**
 * GraphQL initialization
 */
require('./server/graphql')(app, db);

/**
 * Initialize notifier
 */
require('./server/scheduler')(db);

/**
 * Start Server
 */
app.listen(process.env.port || 8080, () => {
  console.info("Server started on port", process.env.port || 8080)
});

app.use('/', express.static('./app'))
