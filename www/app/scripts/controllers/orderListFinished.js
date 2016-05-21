angular.module('app').controller('OrderListFinishedController', function () {
  var vm = this;
  vm.finishedOrder = [
    {
      "_id": "52610458e4b0975542d34753", "number": 10,
      "status": 4,
      "items": [
        {name: '番茄炒蛋', count: 1}
      ],
      "total_price": 6.00,
      "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
    },
    {
      "_id": "52610458e4b0975542d34753", "number": 11,
      "status": 4,
      "items": [
        {name: '番茄炒蛋', count: 1},
        {name: '青椒肉丝', count: 1}
      ],
      "total_price": 6.00,
      "created_at": "2016-05-20T07:58:51Z", "updated_at": "2016-05-21T07:58:51Z", "finished_at": "2016-05-21T07:58:51Z"
    }
  ]
});
