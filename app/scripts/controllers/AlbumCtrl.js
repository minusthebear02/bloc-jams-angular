var blocJams = angular.module('blocJams');

blocJams.controller('AlbumCtrl', ['$scope', 'Fixtures', 'SongPlayer', function($scope, Fixtures, SongPlayer) {
    $scope.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
}]);