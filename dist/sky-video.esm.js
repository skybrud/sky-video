var script = {
	name: 'SkyVideo',
	props: ['src', 'poster'],
	data: function data() {
		return {
			embedded: false,
		};
	},
	methods: {
		embed: function embed() {
			this.embedded = true;
		},
	},
	computed: {
		iframeSrc: function iframeSrc() {
			var iframeSrc;
			if (this.src.indexOf('vimeo') !== -1) {
				iframeSrc = this.src.replace('vimeo.com', 'player.vimeo.com/video');
			} else if (this.src.indexOf('youtube') !== -1) {
				iframeSrc = this.src.replace('watch?v=', 'embed/');
			} else if (this.src.indexOf('dreambroker') !== -1) {
				iframeSrc = this.src.replace('dreambroker.com', 'dreambroker.com');
			}
			iframeSrc += '?autoplay=true&rel=0';
			return iframeSrc;
		},
		iframePoster: function iframePoster() {
			if (!this.poster) {
				console.warn('SkyVideo: There are no poster defined.');
				return '';
			}
			return ("background-image: url('" + (this.poster) + "')");
		},
		defaultButton: function defaultButton() {
			return this.$slots.play === undefined;
		},
	},
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-video"},[_c('div',{on:{"~click":function($event){return _vm.embed($event)}}},[_c('div',{staticClass:"sky-video-click"},[_c('label',[_c('button',{class:['sky-video-play', {'default-button': _vm.defaultButton}]},[_vm._t("play")],2)])]),_vm._v(" "),(_vm.embedded)?_c('div',{staticClass:"sky-video-iframe"},[_c('iframe',{attrs:{"frameborder":"0","allowfullscreen":"allowfullscreen","allow":"autoplay","src":_vm.iframeSrc}})]):_c('div',{staticClass:"sky-video-poster",style:(_vm.iframePoster)})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyVideo.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkyVideo = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var defaults = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	var ref = Object.assign({}, defaults, options);
	var registerComponents = ref.registerComponents;

	if (registerComponents) {
		// Main component
		Vue.component(SkyVideo.name, SkyVideo);
	}
}

export default install;
export { SkyVideo };
