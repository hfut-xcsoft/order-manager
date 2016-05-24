const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.mongodb);
if ('production' !== process.env.NODE_ENV) {
  mongoose.set('debug', true);
}
exports.Item = require('./item');