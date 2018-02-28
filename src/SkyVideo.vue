<script>
// import YoutubePlayer from 'youtube-player';
// import VimeoPlayer from '@vimeo/player';
// import GetVideoId from 'get-video-id';
import SkyWindow from 'sky-window';

export default {
	name: 'SkyVideo',
	props: {
		src: String,
		poster: String,
		width: {
			type: Number,
			default: 640,
		},
		height: {
			type: Number,
			default: 360,
		},
		autoplay: {
			type: [Boolean, String],
			default: false,
		},
		loop: {
			type: Boolean,
			default: false,
		},
		mute: {
			type: Boolean,
			default: false,
		},
		controls: {
			type: Boolean,
			default: true,
		},
		info: {
			type: Boolean,
			default: false,
		},
		mode: {
			type: String,
			default: 'contain',
		},
	},
	data() {
		return {
			autoplayDisabled: true,
			source: null,
			player: null,
			playerClass: null,
			embedded: false,
			isYoutube: false,
			isVimeo: false,
			videoRatio: this.width / this.height,
			container: {
				rect: null,
				ratio: null,
			},
		};
	},
	computed: {
		coverMode() {
			if (this.mode === 'cover') {
				return this.videoRatio <= this.container.ratio
					? 'landscape'
					: 'portrait';
			}

			return '';
		},
		landscapeOriented() {
			return this.videoRatio <= this.container.ratio;
		},
		videoPoster() {
			if (this.poster && !this.shouldAutoplay()) {
				return `background-image: url('${this.poster}')`;
			}

			if (!this.poster && !this.shouldAutoplay()) {
				console.warn('SkyVideo: There are no poster defined.');
			}

			return '';
		},
		defaultButton() {
			return this.$slots.play === undefined;
		},
	},
	beforeMount() {
		const GetVideoId = () => import('get-video-id');
		this.$set(this, 'source', GetVideoId(this.src));

		if (this.source.service === 'vimeo') {
			this.isVimeo = true;
			this.$set(this, 'playerClass', () => import('@vimeo/player'));
		} else if (this.source.service === 'youtube') {
			this.$set(this, 'playerClass', () => import('youtube-player'));
			this.isYoutube = true;
		} else {
			console.error('SkyVideo: Unsupported source');
		}
	},
	mounted() {
		if (this.isYoutube) {
			// settings: https://github.com/gajus/youtube-player
			this.player = YoutubePlayer(this.$refs.player, {
				width: this.width,
				height: this.height,
				videoId: this.source.id,
				playerVars: {
					autoplay: 0,
					origin: window.location.hostname, // Good practice ved brug af jsApi
					enablejsapi: 1, // Giver js control over iframe
					controls: this.controls ? 1 : 0,
					showinfo: this.info ? 1 : 0,
					rel: 0,
					playsinline: 1,
					loop: this.loop ? 1 : 0,
				},
			});
		} else {
			// Settings: https://github.com/vimeo/player.js
			this.player = new VimeoPlayer(this.$refs.player, {
				width: this.width,
				height: this.height,
				id: this.source.id,
				background: !this.controls, // false means show controls
				loop: this.loop,
				title: this.info,
				//color: 'ff0000', // Color supplementing the gray UI
			});
		}

		SkyWindow.resize.subscribe(() => {
			this.setContainer();
		});

		if (this.shouldAutoplay()) {
			this.embed();
		}
	},
	updated() {
		this.setContainer();
	},
	methods: {
		setContainer() {
			this.container.rect = this.$refs.container.getBoundingClientRect();
			this.container.ratio = this.container.rect.width / this.container.rect.height;
		},
		embed() {
			if (!this.embedded) {
				if (this.isYoutube) {
					this.player.playVideo()
						.then(() => {
							if (this.mute) {
								this.player.mute();
							}

							this.player.on('stateChange', (event) => {
								if (event.data !== -1 && !this.embedded) {
									this.embedded = true;
								}
							});
						});
				}

				if (this.isVimeo) {
					this.player.ready()
						.then(() => {
							if (this.mute) {
								this.player.setVolume(0);
							}

							this.embedded = true;
							this.player.play();
						});
				}
			}
		},
		shouldAutoplay() {
			if (this.autoplay === true) {
				this.autoplayDisabled = false;
				return true;
			}

			if (this.autoplay === 'touch') {
				if (window.innerWidth <= 1024) {
					this.autoplayDisabled = false;
					return true;
				}
			}

			if (this.autoplay === 'desktop') {
				if (window.innerWidth > 1024) {
					this.autoplayDisabled = false;
					return true;
				}
			}

			return false;
		},
	},
};
</script>

<style src="./SkyVideo.scss" />
<template src="./SkyVideo.html" />
