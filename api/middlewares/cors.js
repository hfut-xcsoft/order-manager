const config = require('../config');
const CORSMiddleware = (req, res, next) => {
  if (config.allowCORS) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type');
    if (req.method == 'OPTIONS') {
      return res.send();
    }
  }
  next();
};
module.exports = CORSMiddleware;