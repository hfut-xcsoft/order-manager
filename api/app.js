const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
//const middlewares = require('./middlewares');
//const router = require('./config/router');

//app.use(middlewares.responseJson);
app.listen(config.port);
app.use(bodyParser.json());

//router(app);
app.use((req, res) => {
  res.json({test:[1,2,3,4]});
})

//app.use(middlewares.errorHandling);
app.set('json spaces', 4);

if ('development' == process.env.NODE_ENV) {
  app.set('showStackError', true);
  mongoose.set('debug', true);
}
console.log('APP started on  port ' + config.port);
module.exports = app;

