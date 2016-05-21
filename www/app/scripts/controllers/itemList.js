angular.module('app').controller('ItemListController', function () {
  var vm = this;
  vm.items = [
    { "_id": "52610458e4b0975542d34666", "name": " 番茄炒蛋", "picture_url": "http://example.com/pic.jpg", "price": 6, "sales_count": 10, "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z" },
    { "_id": "52610458e4b0975542d34666", "name": " 番茄炒蛋", "picture_url": "http://example.com/pic.jpg", "price": 6, "sales_count": 10, "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z" },
    { "_id": "52610458e4b0975542d34666", "name": " 番茄炒蛋", "picture_url": "http://example.com/pic.jpg", "price": 6, "sales_count": 10, "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z" },
    { "_id": "52610458e4b0975542d34666", "name": " 番茄炒蛋", "picture_url": "http://example.com/pic.jpg", "price": 6, "sales_count": 10, "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z" }
  ];
  vm.removeItem = function(index) {
    vm.items.splice(index, 1);
  }
});
