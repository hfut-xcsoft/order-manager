const mongoose = require('mongoose');
const cache = require('../common/cache');
const Schema = mongoose.Schema;

function getDateString(date) {
  if (! (date instanceof Date)) {
    date = new Date(date);
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

const StatisticSchema = new Schema({
  date: { type: String },
  day_of_week: { type: Number, default: new Date().getDay() },
  count: { type: Number, default: 0 },
  total_price: { type: Number, default: 0 },
  __v: { select: 0 }
});

StatisticSchema.statics = {
  addData: function (count, price) {
    var today = getDateString(Date.now());
    cache.del('statistic:date:' + today).then(() => {
      return this.find({date: today}).count().exec();
    }).then(num => {
      if (num) {
        return this.update({date: today}, {$inc: {count: count, total_price: price}}).exec();
      }
      var newStatistic = new Statistic({
        date: today,
        count: count,
        total_price: price
      });
      return newStatistic.save();
    });
  }
};

const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic;


