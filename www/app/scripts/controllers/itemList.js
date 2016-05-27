angular.module('app').controller('ItemListController', function (Item) {
  var vm = this;
  vm.items = Item.query();
  vm.removeItem = function(index) {
    Item.delete({id: vm.items[index]._id})
      .$promise.then(function () {
        vm.items.splice(index, 1);
      });
  }
});
