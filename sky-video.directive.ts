/* global angular */
(function () {
	'use strict';

	/**
	 * Directive: skyVideo
	 *
	 * Takes most kinds of url's for youtube or vimeo videos
	 *
	 * Shows poster with custom play-button for fast load,
	 * replaces with real video once clicked.
	 *
	 * Usage: <div sky-video="https://www.youtube.com/watch?v=mxzgwJ8tSE0"></div>
	 *
	 **/

	angular.module('skyVideo').directive('skyVideo',skyVideo);

	skyVideo.$inject = ['skyVideoHelper'];

	function skyVideo(skyVideoHelper) {
		var directive = {
			restrict:'A',
			template:'<div style="padding-top:56.25%;"><button no-uniform title="Play video"></button></div>', /* 56.25% because 16:9 */
			link:link
		};

		function link(scope,element,attributes) {

			var videoElement = angular.element('<iframe />');

			skyVideoHelper.getObjFromString(attributes.skyVideo).then(function(video) {
				element.css({backgroundImage:'url('+video.poster+')'});
				element.one('click', function(e) {
					e.preventDefault();
					element.addClass('playing');
					videoElement.attr('src',video.embed);
					videoElement.css({cssText:'position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%'});
					videoElement.attr('allowfullscreen','allowfullscreen');
					element.append(videoElement);
					return false;
				});
			}, function(err) {
				throw(err);
			});
		}

		return directive;
	}

})();
