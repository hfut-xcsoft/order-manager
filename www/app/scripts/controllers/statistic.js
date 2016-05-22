angular.module('app').controller('StatisticController', function () {
  var vm = this;
  vm.views = ['周', '月', '年'];
  vm.view = 0;
  vm.changeView = function (index) {
    vm.view = index;
  }
});
