import SkyVideo from './SkyVideo.vue';

const defaults = {
	registerComponents: true,
};

export {
	SkyVideo,
};

export default {
	install(Vue, options) {
		const { registerComponents } = Object.assign({}, defaults, options);

		if (registerComponents) {
			// Main component
			Vue.component(SkyVideo.name, SkyVideo);
		}
	},
};