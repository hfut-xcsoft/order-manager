'use strict';
angular.module('app').controller('ProductController', function () {
  var vm = this;
  vm.productOrders = [
    {
      "_id": "52610458e4b0975542d34753", "number": 10,
      "status": 4,
      "items": [
        {name: '番茄炒蛋', count: 1, status: 2},
        {name: '肉沫茄子', count: 1, status: 1}
      ],
      "total_price": 13.00,
      "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
    },
    {
      "_id": "52610458e4b0975542d34753", "number": 11,
      "status": 4,
      "items": [
        {name: '番茄炒蛋', count: 1, status: 0},
        {name: '肉沫茄子', count: 1, status: 1}
      ],
      "total_price": 13.00,
      "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
    }
  ];
});
