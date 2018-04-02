var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connection.on('error',(err) => console.error('connection error:', err))

mongoose.connect('mongodb://localhost/tv-tracker', {});

module.exports = {
  connection: mongoose.connection,
  Users: require('./schemas/user')(mongoose)
};