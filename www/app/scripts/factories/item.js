angular.module('app').factory('Item', function (Configs, $resource) {
  return $resource(Configs.API_BASE + '/items/:id', {id: '@id'}, {
    update: {method: 'PUT'}
  });
});
