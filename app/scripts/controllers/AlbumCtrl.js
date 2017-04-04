(function() {
    function AlbumCtrl($scope, Fixtures, SongPlayer) {
        $scope.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['$scope', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})();