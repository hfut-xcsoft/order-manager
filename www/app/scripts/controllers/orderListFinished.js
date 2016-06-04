angular.module('app').controller('OrderListFinishedController', function (Order) {
  var vm = this;

  Order.query({status: 3, sort: '-finished_at'}).$promise.then(function (orders) {
    var length = orders.length;
    orders.forEach(function (order, i) {
      order.index = length - i;
    });
    vm.finishedOrders = orders;
  });
});
