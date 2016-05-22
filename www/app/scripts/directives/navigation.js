angular.module('app').directive('navigation', function ($compile) {
  return {
    restrict: 'EA',
    templateUrl: 'views/navigation.html',
    controller: function ($scope, $rootScope) {
      $scope.navItems = [
        {
          url: '#/orders/current',
          name: '订单管理',
          code: 'order',
          active: false
        },
        {
          url: '#/product',
          name: '生产管理',
          code: 'product',
          active: false
        },
        {
          url: '#/items/list',
          name: '商品管理',
          code: 'item',
          active: false
        },
        {
          url: '#/statistic',
          name: '数据统计',
          code: 'statistic',
          active: false
        }
      ];
      $rootScope.$on('$routerChanged', function (event, current) {
        var i;
        var items = $scope.navItems;
        for (i = 0; i < items.length; i++) {
          if (current.name.indexOf(items[i].code) != -1) {
            items[i].active = true;
          } else {
            items[i].active = false;
          }
        }
      })
    }
  }
});
