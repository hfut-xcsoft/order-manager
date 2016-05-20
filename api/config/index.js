var config = {
  port: 5000,
  mongodb: "mongodb://localhost/queuing",
  redis: {
    port: 6379,
    host: '127.0.0.1'
  }
};
module.exports = config;
