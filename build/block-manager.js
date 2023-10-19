/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/functions/filterBlockCategories.js":
/*!***************************************************!*\
  !*** ./src/js/functions/filterBlockCategories.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ filterBlockCategories; }
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Use hooks to switch the block categories.
 *
 * @param {*} options The WP option returned via localized script.
 */
function filterBlockCategories(options) {
  if (!options) {
    return false; // Exit if empty.
  }

  var categories = {};
  options.forEach(function (cat) {
    // Extract values from object.
    var values = Object.values(cat);

    // Convert values into object.
    categories[values[0]] = values[1];
  });

  /**
   * Filter WP Blocks.
   *
   * @param {*} settings
   * @param {*} name
   */
  var filterBlocks = function filterBlocks(settings, name) {
    if (categories[name]) {
      settings.category = categories[name];
      settings.gbm = true;
    }
    return settings;
  };

  // Add filter when blocks register.
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)("blocks.registerBlockType", "gbm/filter-blocks", filterBlocks);
}

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

module.exports = window["wp"]["hooks"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************!*\
  !*** ./src/js/block-manager.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_filterBlockCategories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/filterBlockCategories */ "./src/js/functions/filterBlockCategories.js");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);



// Get options from localized script.
var _gutenberg_block_mana = gutenberg_block_manager,
  blocks = _gutenberg_block_mana.blocks,
  categories = _gutenberg_block_mana.categories;

// Filter WP block categories.
if (categories) {
  (0,_functions_filterBlockCategories__WEBPACK_IMPORTED_MODULE_0__["default"])(categories);
}

// Filter blocks.
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  var _window;
  if ((_window = window) !== null && _window !== void 0 && _window._wpLoadBlockEditor) {
    window._wpLoadBlockEditor.then(function () {
      if (!blocks) {
        return;
      }
      Object.keys(blocks).forEach(function (key) {
        var blockName = blocks[key];
        var is_variation = blockName.indexOf("variation") !== -1 ? true : false;
        if (is_variation) {
          // Block Variation handler
          var variation = blockName.split(";"); // e.g. `variation;core/embed;twitter`
          if (variation.length === 3) {
            wp.blocks.unregisterBlockVariation(variation[1], variation[2]); // `core/embed`, `twitter`
          }
        } else {
          // Prevent paragraph from being disabled.
          // eslint-disable-next-line no-lonely-if
          if (blockName !== "core/paragraph" && blockName && 0 !== blockName.length && undefined !== wp.blocks.getBlockType(blockName)) {
            wp.blocks.unregisterBlockType(blockName);
          }
        }
      });
    });
  }
});
}();
/******/ })()
;
//# sourceMappingURL=block-manager.js.map