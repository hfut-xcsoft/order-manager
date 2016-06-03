angular.module('app').factory('Order', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/orders/:id', {id: '@id'}, {
    update: {method: 'PUT'}
  })
});
