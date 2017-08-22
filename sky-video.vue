<script>

/*
 * TODO: URLs
 * Might need to check URLs better.
 */

export default {
	name: 'sky-video',
	props: ['src', 'poster'],
	data() {
		return {
			embedded: false,
		};
	},
	methods: {
		embed() {
			this.embedded = true;
		},
	},
	computed: {
		iframeSrc() {
			let iframeSrc;

			if (this.src.indexOf('vimeo') !== -1) {
				iframeSrc = this.src.replace('vimeo.com', 'player.vimeo.com/video');
			} else if (this.src.indexOf('youtube') !== -1) {
				iframeSrc = this.src.replace('watch?v=', 'embed/');
			}

			iframeSrc += '?autoplay=true&rel=0';

			return iframeSrc;
		},
		iframePoster() {
			return `background-image: url('${this.poster}')`;
		},
	},
};
</script>

<style src="./sky-video.scss"></style>
<template src="./sky-video.html"></template>
