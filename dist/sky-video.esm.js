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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-video"},[_c('div',{on:{"~click":function($event){return _vm.embed($event)}}},[_c('div',{staticClass:"sky-video-click"},[_c('label',[_c('button',{class:['sky-video-play', {'default-button': _vm.defaultButton}]},[_vm._t("play")],2)])]),_vm._v(" "),(_vm.embedded)?_c('div',{staticClass:"sky-video-iframe"},[_c('iframe',{attrs:{"frameborder":"0","allowfullscreen":"allowfullscreen","allow":"autoplay","src":_vm.iframeSrc}})]):_c('div',{staticClass:"sky-video-poster",style:(_vm.iframePoster)})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-40c55e1d_0", { source: "\n.sky-video{position:relative;width:100%;left:0;right:0;bottom:0;position:absolute\n}\n.sky-video-iframe{top:0;left:0;right:0;bottom:0;z-index:3;position:absolute;height:100%\n}\n.sky-video-poster{top:0;left:0;right:0;bottom:0;z-index:0;position:absolute;background-size:cover;background-position:center;background-repeat:no-repeat\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
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
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
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
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var SkyVideo = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
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

export default install;
export { SkyVideo };
