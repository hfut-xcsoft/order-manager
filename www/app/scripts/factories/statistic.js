angular.module('app').factory('Statistics', function (Configs, $resource) {
  return $resource(Configs.API_BASE + '/statistics');
});
