<script>
export default {
	name: 'SkyVideo',
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
			if (!this.poster) {
				console.warn('SkyVideo: There are no poster defined.');
				return '';
			}
			return `background-image: url('${this.poster}')`;
		},
		defaultButton() {
			return this.$slots.play === undefined;
		},
	},
};
</script>

<style src="./SkyVideo.scss" />
<template src="./SkyVideo.html" />
