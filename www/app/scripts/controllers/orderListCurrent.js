angular.module('app').controller('OrderListCurrentController', function ($scope, Order) {
  var vm = this;
  vm.onclick = function (data) {
    alert(data)
  };
  vm.currentOrders = Order.query();
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
        console.log(data);
        order = data;
    })
  };
  //vm.currentOrders = [
  //  {
  //    "_id": "52610458e4b0975542d34753", "number": 10,
  //    "status": 2,
  //    "items": [
  //      {name: '番茄炒蛋', count: 1}
  //    ],
  //    "total_price": 6.00,
  //    "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
  //  },
  //  {
  //    "_id": "52610458e4b0975542d34753", "number": 11,
  //    "status": 0,
  //    "items": [
  //      {name: '番茄炒蛋', count: 1},
  //      {name: '青椒肉丝', count: 1}
  //    ],
  //    "total_price": 6.00,
  //    "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
  //  }
  //]
});
