const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const controllers = require('./controllers');
const middlewares = require('./middlewares');
const HttpError = require('./common/http-error');

app.use(middlewares.CORSMiddleware);
app.use(middlewares.response);
app.listen(config.port);
app.use(bodyParser.json());
app.set('json spaces', 4);

app.use(controllers);
app.use(() => {throw new HttpError.NotFoundError()});
app.use(middlewares.errorHandling);

if ('development' == process.env.NODE_ENV) {
  app.set('showStackError', true);
}
console.log('APP started on  port ' + config.port);
module.exports = app;
