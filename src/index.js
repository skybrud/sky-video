import SkyVideo from './SkyVideo.vue';

const defaults = {
	registerComponents: true,
};

export {
	SkyVideo,
};

export default function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		// Main component
		Vue.component(SkyVideo.name, SkyVideo);
	}
};