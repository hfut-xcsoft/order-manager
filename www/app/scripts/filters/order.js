'use strict';
angular.module('app').filter('itemsToString', function () {
  return function (items) {
    return items.map(function (item) {
      return item.name + '×' + item.count;
    }).join('、');
  };
}).filter('itemCount', function () {
  return function (items) {
    var total = 0;
    items.forEach(function (item) {
      total += item.count;
    });
    return total;
  };
}).filter('unfinishedItemCount', function () {
  return function (items) {
    var total = 0;
    items.forEach(function (item) {
      if (item.status !== 2) {
        total += item.count;
      }
    });
    return total;
  };
}).filter('itemDuringTime', function () {
  return function (item) {
    var begin = new Date(item.created_at);
    return  new Date(item.finished_at) - begin;
  }
});
