(()=>{"use strict";var e={n:r=>{var o=r&&r.__esModule?()=>r.default:()=>r;return e.d(o,{a:o}),o},d:(r,o)=>{for(var n in o)e.o(o,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:o[n]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)};const r=window.wp.blocks,o=window.wp.domReady;var n=e.n(o);const t=window.wp.hooks;var a=gutenberg_block_manager,i=a.blocks,c=a.categories;c&&function(e){if(!e)return!1;var r={};e.forEach((function(e){var o=Object.values(e);r[o[0]]=o[1]})),(0,t.addFilter)("blocks.registerBlockType","gbm/filter-blocks",(function(e,o){return r[o]&&(e.category=r[o],e.gbm=!0),e}))}(c),n()((function(){null!=i&&i.length&&i.forEach((function(e){var o=(0,r.getBlockType)(e);if(-1!==e.indexOf("variation")){var n=e.split(";");3===(null==n?void 0:n.length)&&(0,r.unregisterBlockVariation)(n[1],n[2])}else"core/paragraph"!==e&&void 0!==o&&(0,r.unregisterBlockType)(e)}))}))})();