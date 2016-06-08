'use strict';
const Statistic = require('../models').Statistic;
const HttpError = require('some-http-error');
const moment = require('moment');
const R = require('ramda');

const statisticController = {};

const RANGE_ALL   = 0;
const RANGE_YEAR  = 1;
const RANGE_MONTH = 2;
const RANGE_WEEK  = 3;
const RANGE_DAY   = 4;

const VIEW_PREVIOUS = 0;
const VIEW_CURRENT  = 1;

moment.locale('zh-cn');
statisticController.getStatisticData = (req, res, next) => {
  const range = Number.parseInt(req.query.range) || RANGE_ALL;
  const view =  Number.parseInt(req.query.view)  || VIEW_PREVIOUS;
  const date = new Date(req.query.date || Date.now());
  if (date.toString() === 'Invalid Date') {
    throw new HttpError.BadRequestError('日期格式错误');
  }
  const queryDate = {
    start: moment(0).format('YYYY-MM-DD'),
    end: moment(date).format('YYYY-MM-DD')
  };
  if (view == VIEW_PREVIOUS) {
    switch (range) {
      case RANGE_ALL:
        break;
      case RANGE_YEAR:
        queryDate.start = moment(date).subtract(1, 'years').format('YYYY-MM-DD');
        break;
      case RANGE_MONTH:
        queryDate.start = moment(date).subtract(1, 'months').format('YYYY-MM-DD');
        break;
      case RANGE_WEEK:
        queryDate.start = moment(date).subtract(1, 'weeks').format('YYYY-MM-DD');
        break;
      case RANGE_DAY:
        queryDate.start = moment(date).format('YYYY-MM-DD');
        break;
      default:
        throw new HttpError.BadRequestError('range类型错误');
    }
  } else if (view == VIEW_CURRENT) {
    switch (range) {
      case RANGE_ALL:
        break;
      case RANGE_YEAR:
        queryDate.start = moment(date).startOf('year').format('YYYY-MM-DD');
        queryDate.end = moment(date).endOf('year').format('YYYY-MM-DD');
        break;
      case RANGE_MONTH:
        queryDate.start = moment(date).startOf('month').format('YYYY-MM-DD');
        queryDate.end = moment(date).endOf('month').format('YYYY-MM-DD');
        break;
      case RANGE_WEEK:
        queryDate.start = moment(date).startOf('week').format('YYYY-MM-DD');
        queryDate.end = moment(date).endOf('week').format('YYYY-MM-DD');
        break;
      case RANGE_DAY:
        queryDate.start = moment(date).format('YYYY-MM-DD');
        break;
      default:
        throw new HttpError.BadRequestError('range类型错误');
    }
  } else {
    throw new HttpError.BadRequestError('view类型错误');
  }
  Statistic.findStatisticsBetween(queryDate.start, queryDate.end).then(statistics => {
    res.success(statistics);
  }).catch(next);
};

module.exports = statisticController;