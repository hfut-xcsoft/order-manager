'use strict';
angular.module('app').controller('ProductController', function (Order, OrderItems) {
  var vm = this;
  vm.productOrders = Order.query({status: 1});
  vm.updateState = function (orderId, itemId, toState) {
    OrderItems.update({orderId: orderId, itemId: itemId}, {status: toState})
      .$promise.then(function () {
        vm.productOrders = Order.query({status: 1});
    })
  };
});
