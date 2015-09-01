/* global angular */

declare module sky {
	interface skyVideoHelper {
		getObjFromString(string):ng.IPromise<skyVideoObj>;
	}
	interface skyVideoObj {
		embed:string;
		poster:string;
	}
}

(function () {
	'use strict';

	angular.module('skyVideo').service('skyVideoHelper', skyVideoHelper);

	skyVideoHelper.$inject = ['$q','$http'];

	function skyVideoHelper($q,$http):sky.skyVideoHelper {

		var getObjFromString = function(string) {
			var defer=$q.defer();
			var match;
			if(string.indexOf('vimeo') != -1) {
				match = string.match(/video\/|https?:\/\/vimeo\.com\/{1,2}([0-9]*)/);
				if(match&&match[1].length>1) {
					$http({
						url:'//vimeo.com/api/v2/video/'+match[1]+'.json'
					}).then(function(res) {
						defer.resolve({
							embed:'//player.vimeo.com/video/'+match[1]+'?title=0&amp;byline=0&amp;portrait=0&amp;&amp;autoplay=1',
							poster:res.data[0].thumbnail_large
						});
					}, function() {
						defer.reject('vimeo api down or no video with that id');
					});

				} else {
					defer.reject('detected vimeo in url, but unable to detect id');
				}
			} else {
				match = string.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
				if (match&&match[7].length==11){
					defer.resolve({
						embed:'//www.youtube.com/embed/'+match[7]+'?rel=0&controls=1&showinfo=0&autoplay=true&enablejsapi=1',
						poster:'//i.ytimg.com/vi/'+match[7]+'/0.jpg'
					});
				} else {
					defer.reject('detected youtube in url, but unable to detect id');
				}
			}

			return defer.promise;
		};

		return {
			getObjFromString:getObjFromString
		};

	}

})();
