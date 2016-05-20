const HttpError = require('../common/http-error').HttpError;
const errorHandling = (err, req,  res, next) => {
  if (err instanceof HttpError) {
    res.error(err.message, err.statusCode);
  } else {
    console.log(err.stack);
    res.error(err.message, 500)
  }
};

module.exports = errorHandling;