angular.module('app').controller('OrderNewController', function (Item, Order, $location) {
  var vm  = this;
  function getTotalPrice(items) {
    var total = 0;
    items.forEach(function (item) {
      total += item.price;
    });
    return total
  }
  vm.chosenItems = [];
  vm.totalPrice = 0;
  vm.allItems = Item.query();
  vm.chooseItem = function (item) {
    vm.chosenItems.unshift(item);
    vm.totalPrice = getTotalPrice(vm.chosenItems);
  };
  vm.unchooseItem = function (index) {
    vm.chosenItems.splice(index, 1);
    vm.totalPrice = getTotalPrice(vm.chosenItems);
  };
  vm.submitOrder = function () {
    Order.save({items: vm.chosenItems.map(function (item) {
      return item._id;
    })}).$promise.then(function() {
      $location.path('/orders/current');
    })
  }
});
