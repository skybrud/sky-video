'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var script = {
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

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-video"},[_vm._ssrNode("<div>","</div>",[_vm._ssrNode("<div class=\"sky-video-click\">","</div>",[_vm._ssrNode("<label>","</label>",[_vm._ssrNode("<button"+(_vm._ssrClass(null,['sky-video-play', {'default-button': _vm.defaultButton}]))+">","</button>",[_vm._t("play")],2)])]),_vm._ssrNode(" "+((_vm.embedded)?("<div class=\"sky-video-iframe\"><iframe frameborder=\"0\" allowfullscreen=\"allowfullscreen\" allow=\"autoplay\""+(_vm._ssrAttr("src",_vm.iframeSrc))+"></iframe></div>"):("<div class=\"sky-video-poster\""+(_vm._ssrStyle(null,_vm.iframePoster, null))+"></div>")))],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-40c55e1d_0", { source: "\n.sky-video{position:relative;width:100%;left:0;right:0;bottom:0;position:absolute\n}\n.sky-video-iframe{top:0;left:0;right:0;bottom:0;z-index:3;position:absolute;height:100%\n}\n.sky-video-poster{top:0;left:0;right:0;bottom:0;z-index:0;position:absolute;background-size:cover;background-position:center;background-repeat:no-repeat\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = "data-v-40c55e1d";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyVideo.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  function __vue_create_injector_ssr__(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
      context = __VUE_SSR_CONTEXT__;
    }

    if (!context) return function () {}

    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumerable: true,
        get: () => context._styles
      });
      context._renderStyles = renderStyles;
    }

    function renderStyles(styles) {
      let css = '';
      for (const {ids, media, parts} of styles) {
        css +=
          '<style data-vue-ssr-id="' + ids.join(' ') + '"' + (media ? ' media="' + media + '"' : '') + '>'
          + parts.join('\n') +
          '</style>';
      }

      return css
    }

    return function addStyle(id, css) {
      const group = css.media || 'default';
      const style = context._styles[group] || (context._styles[group] = { ids: [], parts: [] });

      if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.parts.push(code);
      }
    }
  }

  
  var SkyVideo = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    __vue_create_injector_ssr__
  );

const defaults = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		// Main component
		Vue.component(SkyVideo.name, SkyVideo);
	}
}

exports.SkyVideo = SkyVideo;
exports.default = install;
