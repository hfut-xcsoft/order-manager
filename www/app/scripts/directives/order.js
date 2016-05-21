angular.module('app').directive('orderActionButton', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var btns;
      var status = scope.$eval(attrs.orderActionButton);
      switch (status) {
        case 0:
          btns = $compile('<button class="btn btn-red">取消</button> <a href="#/orders/{{order._id}}" class="btn btn-yellow">修改</a>')(scope);
          element.append(btns);
          break;
        case 1:
        case 2:
          btns = $compile('<div><button ng-click="scope.finish(order._id)" class="btn btn-green">完成</button>')(scope);
          element.append(btns);
          break;
      }
    }
  }
}).directive('orderState', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var status = scope.$eval(attrs.orderState);
      var span;
      switch (status) {
        case 0: span = '<span class="grey">等待中</span>'; break;
        case 1: span = '<span class="orange">生产中</span>'; break;
        case 2: span = '<span class="green">待领取</span>'; break;
      }
      element.append($compile(span)(scope));
    }
  }
})
