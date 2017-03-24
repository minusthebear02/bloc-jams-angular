var blocJams = angular.module('blocJams');

blocJams.controller('AlbumCtrl', ['$scope', 'Fixtures', function($scope, Fixtures) {
    $scope.albumData = Fixtures.getAlbum();
}]);