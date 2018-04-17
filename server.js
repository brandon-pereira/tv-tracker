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
const db = require('./backend/database');

/**
 * Passport authentication middleware
 */
require('./backend/passport')(app, db);

/**
 * GraphQL initialization
 */
require('./backend/graphql')(app, db);

/**
 * Initialize notifier
 */
require('./backend/scheduler')(db);

/**
 * Start backend
 */
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.info("Server started on port", process.env.SERVER_PORT || 8080)
});

if(!process.env.PRODUCTION) {
  app.use("/", express.static("./dist"));
}
