'use strict';

/**
 * @ngdoc overview
 * @name orderManagerApp
 * @description
 * # orderManagerApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });

  $stateProvider.state('items', {
    url: '/items',
    template: '<div ui-view></div>',
    abstract: true
  });
  $stateProvider.state('items.list', {
    url: '/list',
    templateUrl: 'views/item/list.html',
    controller: 'ItemListController',
    controllerAs: 'vm',
    title: "商品列表"
  });
  $stateProvider.state('items.new', {
    url: '/new',
    templateUrl: 'views/item/new.html',
    controller: 'ItemNewController',
    controllerAs: 'vm',
    title: "添加商品"
  });

  $stateProvider.state('orders', {
    url: '/orders',
    template: '<div ui-view></div>',
    abstract: true
  });
  $stateProvider.state('orders.current', {
    url: '/current',
    templateUrl: 'views/order/current.html',
    controller: 'OrderListCurrentController',
    controllerAs: 'vm',
    title: '当前订单'
  });
  $stateProvider.state('orders.finished', {
    url: '/finished',
    templateUrl: 'views/order/finished.html',
    controller: 'OrderListFinishedController',
    controllerAs: 'vm',
    title: '已完成订单'
  });
  $stateProvider.state('orders.new', {
    url: '/new',
    templateUrl: 'views/order/edit.html',
    controller: 'OrderNewController',
    controllerAs: 'vm',
    title: '新订单'
  });

  $stateProvider.state('product', {
    url: '/product',
    templateUrl: 'views/product/list.html',
    controller: 'ProductController',
    controllerAs: 'vm',
    title: '生产管理'
  });

  $stateProvider.state('statistic', {
    url: '/statistic',
    templateUrl: 'views/statistic/chart.html',
    controller: 'StatisticController',
    controllerAs: 'vm',
    title: '数据统计'
  });

  $stateProvider.state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $urlRouterProvider.when('', '/orders/current');
  $urlRouterProvider.otherwise('/404');
}).run(function ($window, $document, $rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, current) {
    $rootScope.title = current.title + ' | 订单管理系统';
    $rootScope.$broadcast('$routerChanged', current);
  })
});
