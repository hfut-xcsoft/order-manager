'use strict';
angular.module('app').directive('productActionButton', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var item = scope.$eval(attrs.productActionButton);
      var order = scope.$eval(attrs.productOrder);
      var status = item.status;
      var btn;
      switch (status) {
        case 0:
          btn = '<button ng-click="vm.updateState(order._id, item._id, item.status+1)" class="btn btn-blue">生产</button>';
          break;
        case 1:
          btn = '<button ng-click="vm.updateState(order._id, item._id, item.status+1)" class="btn btn-green">完成</button>';
      }
      if (btn) {
        element.append($compile(btn)(scope));
      }
    }
  };
}).directive('productItemStatus', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var status = scope.$eval(attrs.productItemStatus);
      switch (status) {
        case 0:
          element.text("待生产").addClass('grey');
          break;
        case 1:
          element.text('生产中').addClass('orange');
          break;
        case 2:
          element.text('已完成').addClass('green');
          break;
      }
    }
  }
});
