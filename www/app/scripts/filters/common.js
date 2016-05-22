'use strict';

angular.module('app').filter('rmb', function () {
  return function (value) {
    return '¥ ' + value.toFixed(2);
  };
});
