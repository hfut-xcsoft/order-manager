angular.module('app').filter('itemsToString', function () {
  return function (items) {
    return items.map(function (item) {
      return item.name + '×' + item.count;
    }).join('、');
  }
});
