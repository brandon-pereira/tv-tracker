const express = require('express');
const app = express();
const db = require('./database');

/**
 * Express middleware
 */
app.use(require('cookie-parser')());
app.use(require('body-parser').json({}));
app.use(require('body-parser').urlencoded({ extended: true }));

/**
 * Passport authentication middleware
 */
require('./passport')(app, db);

/**
 * GraphQL initialization
 */
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql');
// const api = express.Router();
// api.use((req, res, next) => {
//   if(req.user) {
//     next();
//   } else {
//     res.redirect('/');
//   }
// })
// app.use('/api', api);
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphqli', graphiqlExpress({ endpointURL: '/graphql' }));

/**
 * Start Server
 */
app.listen(process.env.port || 8080, () => {
  console.info("Server started on port", process.env.port || 8080 )
});


module.exports = app;