(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /**
        @desc stores album being played
        @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        @function getSongIndex
        @desc gets index number of active song
        @type {Object}
        @return number
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        @desc Buzz object audio file
        @type {Object}
        */
        var currentBuzzObject = null;

        /**
        @function setSong
        @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        }
        
        /**
        @function playSong
        @desc Plays song of currentBuzzObject and sets .playing boolean to true
        @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        @function stopSong
        @desc stops currently playing song
        @param {Object}
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
          /**
        @desc holds currently playing/paused song info
        @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        @desc Current playback time (in seconds) of currently playing song
        @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        @function .play
        @desc Plays song selected if no song is SongPlayer.currentSong is null or if SongPlayer.currentSong is paused, then sets new song with setSong
        @param {Object} song
        */
        SongPlayer.play = function(song) {
            
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                
                setSong(song);
            
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        @function .pause
        @desc Pauses SongPlayer.currentSong, then sets song.playing to false
        @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        @function .previous
        @desc finds index of active song and decrements it by one, change active song to new song index
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        @function .next
        @desc increments to the next song in the current album and plays it
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                var song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        /**
        @function setCurrentTime
        @desc Set current time (in seconds) of currently playing song
        @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        
        return SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();