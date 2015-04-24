(function () {
	'use strict';

	describe('Directive: skyVideo', function() {

		var $rootScope,
			scope,
			$compile,
			element,
			skyVideoHelper,
			$q,
			def,
			html;

		beforeEach(module('skyVideo'));

		beforeEach(inject(function(_$rootScope_, _$compile_, _skyVideoHelper_,_$q_) {
			$rootScope=_$rootScope_;
			$compile=_$compile_;
			skyVideoHelper=_skyVideoHelper_;
			$q=_$q_;
		}));

		beforeEach(function() {
			element = angular.element('<div sky-video="https://www.youtube.com/watch?v=mxzgwJ8tSE0"></div>');
			$compile(element)($rootScope);
			scope=element.scope();

			def = $q.defer();
			spyOn(skyVideoHelper,'getObjFromString').and.returnValue(def.promise);
			$rootScope.$digest();

			html = element.html();

		});

		it('should only contain button until clicked', function() {
			expect(html).toBe('<div style="padding-top:56.25%;"><button no-uniform="" title="Play video"></button></div>');
		});

		it('should inject iframe when clicked',function() {

			element.triggerHandler('click');
			html = element.html();

			expect(element.find('iframe').length).toEqual(1);
		});

		it('should set src of injected iframe',function() {

			element.triggerHandler('click');
			html = element.html();

			expect(element.find('iframe')[0].src).toBe('http://www.youtube.com/embed/mxzgwJ8tSE0?rel=0&controls=1&showinfo=0&autoplay=true');
		});


	});

})();
