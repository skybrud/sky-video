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
	 * Usage: <sky-video src="https://www.youtube.com/watch?v=mxzgwJ8tSE0"></sky-video>
	 *
	 **/

	angular.module('skyVideo').directive('skyVideo',skyVideo);

	skyVideo.$inject = ['skyVideoHelper'];

	function skyVideo(skyVideoHelper) {
		var directive = {
			restrict: 'E',
			scope: {},
			template: '<div style="padding-top:56.25%;"><button class="video">play</button></div>', /* 56.25% because 16:9 */
			link: link
		};

		function link(scope, element, attributes) {

			var videoElement:any = angular.element('<iframe />');

			skyVideoHelper.getObjFromString(attributes.src).then(function(video) {
				let background = attributes.poster || video.poster;

				element.css({backgroundImage:'url('+background+')'});
				element.one('click', function(e) {
					e.preventDefault();
					element.addClass('playing');
					videoElement.attr('src',video.embed);
					videoElement.css({cssText:'position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%'});
					videoElement.attr('allowfullscreen','allowfullscreen');
					element.append(videoElement);
					return false;
				});
				
				element.on('skyVideo:play', function() {
					if (element.hasClass('playing')) {
						videoElement[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
						videoElement[0].contentWindow.postMessage('{"method":"play"}', '*');
					} else {
						element.triggerHandler('click');
					}
				});
				element.on('skyVideo:pause', function() {
					if (!element.hasClass('playing')) {
						return
					}
					videoElement[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
					videoElement[0].contentWindow.postMessage('{"method":"pause"}', '*');
				});
				
			}, function(err) {
				throw(err);
			});
		}

		return directive;
	}

})();
