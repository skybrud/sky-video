(function () {
	'use strict';

	describe('Service: skyVideoHelper',function() {

		var skyVideoHelper,
			$rootScope,
			$httpBackend;

		beforeEach(module('skyVideo'));

		beforeEach(inject(function(_skyVideoHelper_, _$rootScope_, _$httpBackend_) {
			skyVideoHelper=_skyVideoHelper_;
			$rootScope = _$rootScope_;
			$httpBackend = _$httpBackend_;
		}));

		describe('Parsing youtube', function() {

			it('should add the correct pattern to the youtube-object', function() {
				var res;
				skyVideoHelper.getObjFromString('https://www.youtube.com/watch?v=-UpRtbcUbrU').then(function(_res_) {
					res=_res_;
				});
				$rootScope.$digest();

				var youtubeId=res.embed.match(/embed\/([-\w]+)/i)[1];
				expect(res.embed).toBe('//www.youtube.com/embed/'+youtubeId+'?rel=0&controls=1&showinfo=0&autoplay=true');
				expect(res.poster).toBe('//i.ytimg.com/vi/'+youtubeId+'/0.jpg');
			});

			it('should work with youtube urls like: https://www.youtube.com/watch?v=-UpRtbcUbrU',function() {
				var res;
				skyVideoHelper.getObjFromString('https://www.youtube.com/watch?v=-UpRtbcUbrU').then(function(_res_) {
					res=_res_;
				});
				$rootScope.$digest();

				expect(res.embed.match(/embed\/([-\w]+)/i)[1]).toBe('-UpRtbcUbrU');
			});

			it('should work with youtube urls like: https://www.youtube.com/v/PvbqV8W96D0',function() {
				var res;
				skyVideoHelper.getObjFromString('https://www.youtube.com/v/PvbqV8W96D0').then(function(_res_) {
					res=_res_;
				});
				$rootScope.$digest();

				expect(res.embed.match(/embed\/([-\w]+)/i)[1]).toBe('PvbqV8W96D0');
			});

			it('should work with youtube urls like: http://youtu.be/dQw4w9WgXcQ',function() {
				var res;
				skyVideoHelper.getObjFromString('http://youtu.be/dQw4w9WgXcQ').then(function(_res_) {
					res=_res_;
				});
				$rootScope.$digest();

				expect(res.embed.match(/embed\/([-\w]+)/i)[1]).toBe('dQw4w9WgXcQ');
			});

		});


		describe('Parsing vimeo', function() {

			it('should add the correct pattern to the vimeo-object', function() {
				var res;
				skyVideoHelper.getObjFromString('http://vimeo.com/96425312').then(function(_res_) {
					res=_res_;
				});
				var respond = [{"id":96425312,"title":"Philip Roberts: Help, I'm stuck in an event-loop.","description":"Us JavaScript programmers like to use words like, \"event-loop\", \"non-blocking\", \"callback\", \"asynchronous\", \"single-threaded\" and \"concurrency\".<br \/>\r\n<br \/>\r\nWe say things like \"don't block the event loop\", \"make sure your code runs at 60 frames-per-second\", \"well of course, it won't work, that function is an asynchronous callback!\"<br \/>\r\n<br \/>\r\nIf you're anything like me, you nod and agree, as if it's all obvious, even though you don't actually know what the words mean; and yet, finding good explanations of how JavaScript actually _works_ isn't all that easy, so let's learn!<br \/>\r\n<br \/>\r\nWith some handy visualisations, and fun hacks, let's get an intuitive understanding of what happens when JavaScript runs. Beginner or veteran, I'm sure you'll learn something!","url":"http:\/\/vimeo.com\/96425312","upload_date":"2014-05-25 11:26:49","mobile_url":"http:\/\/vimeo.com\/96425312","thumbnail_small":"http:\/\/i.vimeocdn.com\/video\/476470428_100x75.webp","thumbnail_medium":"http:\/\/i.vimeocdn.com\/video\/476470428_200x150.webp","thumbnail_large":"http:\/\/i.vimeocdn.com\/video\/476470428_640.webp","user_id":3020055,"user_name":"Cultivate","user_url":"http:\/\/vimeo.com\/edgecaseuk","user_portrait_small":"http:\/\/i.vimeocdn.com\/portrait\/8727847_30x30.webp","user_portrait_medium":"http:\/\/i.vimeocdn.com\/portrait\/8727847_75x75.webp","user_portrait_large":"http:\/\/i.vimeocdn.com\/portrait\/8727847_100x100.webp","user_portrait_huge":"http:\/\/i.vimeocdn.com\/portrait\/8727847_300x300.webp","duration":1213,"width":1280,"height":720,"tags":"scotlandjs2014, scotlandjs","embed_privacy":"anywhere"}];

				$httpBackend.expect('GET','//vimeo.com/api/v2/video/96425312.json').respond(200,respond);

				$rootScope.$digest();
				$httpBackend.flush();

				var vimeoId=res.embed.match(/\/video\/(\d+)/)[1];
				var thumbId=res.poster.match(/\/video\/([_\d]+)/)[1];

				expect(res.embed).toBe('//player.vimeo.com/video/'+vimeoId+'?title=0&amp;byline=0&amp;portrait=0&amp;&amp;autoplay=1');
				expect(res.poster).toBe('http://i.vimeocdn.com/video/'+thumbId+'.webp');
			});

			it('should work vimeo urls like http://vimeo.com/96425312', function() {
				skyVideoHelper.getObjFromString('http://vimeo.com/96425312');
				$httpBackend.expect('GET','//vimeo.com/api/v2/video/96425312.json').respond(200);
			});

			it('should work vimeo urls like https://vimeo.com//116844166', function() {
				skyVideoHelper.getObjFromString('https://vimeo.com//116844166');
				$httpBackend.expect('GET','//vimeo.com/api/v2/video/116844166.json').respond(200);
			});

			afterEach(function() {
				$httpBackend.verifyNoOutstandingRequest();
				$httpBackend.verifyNoOutstandingExpectation();
			});

		});


	});


})();
