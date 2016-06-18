const mongoose = require('mongoose');
const cache = require('../common/cache');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');

function getDateString(date) {
  if (! (date instanceof Date)) {
    date = new Date(date);
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function mapStringToDate(dateStr) {
  return new Date(getDateString(dateStr)).getTime() + 28800000;
}

const StatisticSchema = new Schema({
  datetime: { type: Date },
  day_of_week: { type: Number, default: new Date().getDay() },
  count: { type: Number, default: 0 },
  total_price: { type: Number, default: 0 },
  __v: { type: Number, select: false }
});

StatisticSchema.virtual('date')
  .get(function() { return getDateString(this.datetime)})
  .set(function(date) {
    this.set('datetime', mapStringToDate(date))
  });

StatisticSchema.statics = {
  addData: function (count, price) {
    var today = getDateString(Date.now());
    var datetime = mapStringToDate(today);
    cache.delMulti('statistics:*');
    return this.find({datetime: datetime}).count().exec().then(num => {
      if (num) {
        return this.update({datetime: datetime}, {$inc: {count: count, total_price: price}}).exec();
      }
      var newStatistic = new Statistic({
        date: today,
        count: count,
        total_price: price
      });
      return newStatistic.save();
    });
  },
  findStatisticsBetween: function (start, end) {
    return cache.getSet(`statistics:${start}:${end}`, () => {
      return this.find({datetime: {$gte: start, $lte: end}}).exec().then(statistics => {
        return statistics.map(statistic => {
          var obj = statistic.toObject();
          obj.date = statistic.date;
          delete obj.datetime;
          delete obj._id;
          return obj;
        });
      });
    });
  }
};

const Statistic = mongoose.model('Statistic', StatisticSchema);

module.exports = Statistic;


