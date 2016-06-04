angular.module('app').factory('Order', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/orders/:id', {id: '@id'}, {
    update: {method: 'PUT'}
  })
}).factory('OrderItems', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/orders/:orderId/items/:itemId', {id: '@id'}, {
    update: {method: 'PUT'}
  })
});
