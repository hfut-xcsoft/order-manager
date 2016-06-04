angular.module('app').controller('OrderListCurrentController', function ($scope, Order) {
  var vm = this;
  vm.onclick = function (data) {
    alert(data)
  };
  loadOrders();
  function loadOrders() {
    Order.query({status: '0,1,2', sort: '-status'}).$promise.then(function (orderList) {
      var count = 1;
      orderList.forEach(function(order) {
        order.idString = order.status == 2 ? '-' : count++;
      });
      vm.currentOrders = orderList
    });
  }
  vm.deleteOrder = function (index) {
    Order.delete({id: vm.currentOrders[index]._id})
      .$promise.then(function () {
        vm.currentOrders.splice(index, 1);
      })
  };
  vm.updateState = function (index) {
    var order = vm.currentOrders[index];
    Order.update({id: order._id}, {status: order.status + 1})
      .$promise.then(function (data) {
      loadOrders();
    })
  };
});
