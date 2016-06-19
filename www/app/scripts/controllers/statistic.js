angular.module('app').controller('StatisticController', function ($scope, Statistics) {
  var vm = this;
  vm.views = ['周', '月', '年'];
  vm.view = 0;
  function getDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  function decreseDate(date) {
    return new Date(date - 86400000);
  }
  function parseData(data) {
    var now = new Date();
    var myData = [];
    var i, j;
    var length;
    switch (vm.view) {
      case 0: length = 7;break;
      case 1: length = 31; break;
      case 2: length = 365; break;
    }
    data.reverse();
    for (i = 0, j = 0; i < length; i++) {
      if (j >= data.length || getDate(now) !== data[j].date) {
        myData.push({
          total_price: 0,
          count: 0,
          day_of_week: now.getDay(),
          date: getDate(now)
        })
      } else {
        myData.push(data[j]);
        j++;
      }
      now = decreseDate(now);
    }
    return myData.reverse();
  }
  vm.changeView = function (index) {
    vm.view = index;
    Statistics.query({range: 3 - vm.view}).$promise.then(function(data) {
      vm.data = parseData(data);
    });
  };
  Statistics.query({range: 3 - vm.view}).$promise.then(function(data) {
    vm.data = parseData(data);
  });
});
