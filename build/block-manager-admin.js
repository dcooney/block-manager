/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin.js":
/*!*************************!*\
  !*** ./src/js/admin.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/js/components/App.js");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/style.scss */ "./src/sass/style.scss");


__webpack_require__(/*! ./helpers/otherPlugins */ "./src/js/helpers/otherPlugins.js");


// Render App.
var app = document.getElementById('app');
if (_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot) {
  var root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(app);
  root.render( /*#__PURE__*/React.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], null));
} else {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/React.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], null), app);
}

/***/ }),

/***/ "./src/js/components/App.js":
/*!**********************************!*\
  !*** ./src/js/components/App.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-library */ "@wordpress/block-library");
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions/blocks */ "./src/js/functions/blocks.js");
/* harmony import */ var _functions_getCategoryData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/getCategoryData */ "./src/js/functions/getCategoryData.js");
/* harmony import */ var _Blocks_Blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Blocks/Blocks */ "./src/js/components/Blocks/Blocks.js");
/* harmony import */ var _Categories_Categories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Categories/Categories */ "./src/js/components/Categories/Categories.js");






function App() {
  var _window;
  var _gbm_localize = gbm_localize,
    _gbm_localize$filtere = _gbm_localize.filteredCategoriesAll,
    filteredCategoriesAll = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere;
  (0,_wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__.registerCoreBlocks)();
  var blocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockTypes)();
  var categories = (0,_functions_getCategoryData__WEBPACK_IMPORTED_MODULE_3__["default"])();

  // Parse URL to get current view.
  var url = (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.href;
  var isCategory = url.includes('category-switcher') ? true : false;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isCategory ? /*#__PURE__*/React.createElement(_Categories_Categories__WEBPACK_IMPORTED_MODULE_5__["default"], {
    wpBlocks: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlockCategoryData)(blocks),
    wpCategories: categories
  }) : /*#__PURE__*/React.createElement(_Blocks_Blocks__WEBPACK_IMPORTED_MODULE_4__["default"], {
    wpBlocks: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlocksData)(blocks, filteredCategoriesAll),
    wpCategories: categories
  }));
}

/***/ }),

/***/ "./src/js/components/Blocks/Blocks.js":
/*!********************************************!*\
  !*** ./src/js/components/Blocks/Blocks.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Blocks; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _functions_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../functions/blocks */ "./src/js/functions/blocks.js");
/* harmony import */ var _functions_export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions/export */ "./src/js/functions/export.js");
/* harmony import */ var _Global_Export__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global/Export */ "./src/js/components/Global/Export.js");
/* harmony import */ var _Global_ExportModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Global/ExportModal */ "./src/js/components/Global/ExportModal.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
/* harmony import */ var _Global_Reset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Global/Reset */ "./src/js/components/Global/Reset.js");
/* harmony import */ var _Global_SearchResults__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Global/SearchResults */ "./src/js/components/Global/SearchResults.js");
/* harmony import */ var _components_Category__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Category */ "./src/js/components/Blocks/components/Category.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/Blocks/components/Sidebar.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














/**
 * Render the Blocks component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The Blocks component.
 */
function Blocks(_ref) {
  var _gbm_localize, _gbm_localize2, _wpBlocks$filter, _wpBlocks$filter2;
  var wpBlocks = _ref.wpBlocks,
    wpCategories = _ref.wpCategories;
  var resetButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportModalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      term: '',
      results: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    notifications = _useState6[0],
    setNotifications = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    blocks = _useState8[0],
    setBlocks = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)((_gbm_localize = gbm_localize) === null || _gbm_localize === void 0 ? void 0 : _gbm_localize.disabledBlocks),
    _useState10 = _slicedToArray(_useState9, 2),
    disabledBlocks = _useState10[0],
    setDisabledBlocks = _useState10[1];
  var filteredBlocks = ((_gbm_localize2 = gbm_localize) === null || _gbm_localize2 === void 0 ? void 0 : _gbm_localize2.filteredBlocks) || [];

  // Count the disabled & filtered blocks.
  // Make sure block is installed when being counted.
  var disabledBlocksCount = (_wpBlocks$filter = wpBlocks.filter(function (block) {
    return disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.includes(block.name);
  })) === null || _wpBlocks$filter === void 0 ? void 0 : _wpBlocks$filter.length;
  var filterBlocksCount = (_wpBlocks$filter2 = wpBlocks.filter(function (block) {
    return filteredBlocks === null || filteredBlocks === void 0 ? void 0 : filteredBlocks.includes(block.name);
  })) === null || _wpBlocks$filter2 === void 0 ? void 0 : _wpBlocks$filter2.length;

  /**
   * Category level block toggle switch.
   *
   * @param {Event} e The event object.
   */
  function categoryToggleSwitch(e) {
    var target = e === null || e === void 0 ? void 0 : e.currentTarget;
    if (!target) {
      return false;
    }
    if (target.dataset.state === 'active') {
      bulkProcess(target, 'disable');
      target.classList.add('disabled');
      target.dataset.state = 'inactive';
    } else {
      bulkProcess(target, 'enable');
      target.classList.remove('disabled');
      target.dataset.state = 'active';
    }
  }

  /**
   * Toggle all blocks in a category.
   *
   * @param {Element} target The target element.
   * @param {string}  type   The type of toggle.
   */
  function bulkProcess(target) {
    var _target$parentNode;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enable';
    var container = target === null || target === void 0 || (_target$parentNode = target.parentNode) === null || _target$parentNode === void 0 || (_target$parentNode = _target$parentNode.parentNode) === null || _target$parentNode === void 0 ? void 0 : _target$parentNode.querySelector('.gbm-block-list');
    var allBlocks = container === null || container === void 0 ? void 0 : container.querySelectorAll('.gbm-block-list .item:not(.filtered)');
    if (!allBlocks) {
      return false;
    }
    container.classList.add('loading');

    // Create array of block IDs/names.
    var blockArray = Array.prototype.map.call(allBlocks, function (block) {
      return block.dataset.id;
    });
    if (blockArray !== null && blockArray !== void 0 && blockArray.length) {
      (0,axios__WEBPACK_IMPORTED_MODULE_12__["default"])({
        method: 'POST',
        url: gbm_localize.root + 'gbm/bulk_process/',
        headers: {
          'X-WP-Nonce': gbm_localize.nonce,
          'Content-Type': 'application/json'
        },
        data: {
          blocks: blockArray,
          type: type
        }
      }).then(function (res) {
        var _res$data = res.data,
          data = _res$data === void 0 ? {} : _res$data,
          status = res.status;
        var _data$success = data.success,
          success = _data$success === void 0 ? true : _data$success;
        if (status === 200 && success) {
          _toConsumableArray(allBlocks).forEach(function (block) {
            if (type === 'enable') {
              block.classList.remove('disabled');
            } else {
              block.classList.add('disabled');
            }
          });
          container.classList.remove('loading');
          setDisabledBlocks(data.disabled_blocks);
          setCategoryStatus(allBlocks[0]);
          setNotifications(function (prev) {
            return [].concat(_toConsumableArray(prev), [{
              id: Date.now(),
              msg: data === null || data === void 0 ? void 0 : data.msg,
              success: success
            }]);
          });
        } else {
          container.classList.remove('loading');
          console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error has occurred', 'block-manager'));
        }
      })["catch"](function (error) {
        container.classList.remove('loading');
        console.warn(error);
      });
    } else {
      alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No blocks found', 'block-manager')); // eslint-disable-line no-alert
    }
  }

  /**
   * Toggle the status of a block.
   *
   * @param {Element} element The target element.
   * @param {string}  block   Block name.
   * @param {string}  title   Block title.
   */
  function toggleBlock(element, block, title) {
    if (!element || element.classList.contains('loading')) {
      return false;
    }
    element.classList.add('loading');
    var type = element.classList.contains('disabled') ? 'enable' : 'disable';

    // Send API Request
    (0,axios__WEBPACK_IMPORTED_MODULE_12__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/toggle/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        block: block,
        title: title,
        type: type
      }
    }).then(function (res) {
      var _res$data2 = res.data,
        data = _res$data2 === void 0 ? {} : _res$data2,
        status = res.status;
      var _data$success2 = data.success,
        success = _data$success2 === void 0 ? true : _data$success2;
      if (data && status === 200) {
        if (success) {
          if (type === 'disable') {
            element.classList.add('disabled');
          } else {
            element.classList.remove('disabled');
          }
          element.classList.remove('loading');
          setCategoryStatus(element);
        }
        setDisabledBlocks(data.disabled_blocks);
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: data === null || data === void 0 ? void 0 : data.msg,
            success: success
          }]);
        });
      } else {
        element.classList.remove('loading');
        console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error has occurred', 'block-manager'));
      }
    })["catch"](function (error) {
      element.classList.remove('loading');
      console.warn(error);
    });
  }

  /**
   * Set the status indicator and button states for each category.
   *
   * @param {Element} element The target element.
   */
  function setCategoryStatus(element) {
    if (!element) {
      return false;
    }
    var parent = element.parentNode.parentNode;
    var toggleBtn = parent.querySelector('.gbm-block-switch');
    var items = parent.querySelectorAll('.gbm-block-list .item');
    if (items) {
      var blockArr = Array.prototype.slice.call(items);
      var disabledBlocksFiltered = blockArr.filter(function (block) {
        return block.classList.contains('disabled');
      });

      // If disabled === total items, toggle the switch
      if (disabledBlocksFiltered.length === items.length) {
        toggleBtn.classList.add('disabled');
        toggleBtn.dataset.state = 'inactive';
      } else {
        toggleBtn.classList.remove('disabled');
        toggleBtn.dataset.state = 'active';
      }
    }
  }

  /**
   * Export as PHP code.
   */
  function exportBlocks() {
    (0,_functions_export__WEBPACK_IMPORTED_MODULE_3__.exportHook)(exportModalRef === null || exportModalRef === void 0 ? void 0 : exportModalRef.current, 'blocks');
  }

  /**
   * Reset blocks to default state.
   */
  function resetBlocks() {
    var _resetButtonRef$curre;
    resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre = resetButtonRef.current) === null || _resetButtonRef$curre === void 0 || _resetButtonRef$curre.classList.add('spin'); // Loading state.

    (0,axios__WEBPACK_IMPORTED_MODULE_12__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/blocks_reset/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      var _res$data3 = res.data,
        data = _res$data3 === void 0 ? {} : _res$data3;
      var items = document.querySelectorAll('.gbm-block-list .item.disabled:not(.filtered)');
      if (items) {
        items.forEach(function (item) {
          item.classList.remove('disabled');
        });
      }
      setDisabledBlocks([]);
      setNotifications(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: Date.now(),
          msg: data === null || data === void 0 ? void 0 : data.msg,
          success: true
        }]);
      });
      setTimeout(function () {
        var _resetButtonRef$curre2;
        resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre2 = resetButtonRef.current) === null || _resetButtonRef$curre2 === void 0 || _resetButtonRef$curre2.classList.remove('spin');
      }, 250);
    })["catch"](function (error) {
      var _resetButtonRef$curre3;
      console.warn(error);
      resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre3 = resetButtonRef.current) === null || _resetButtonRef$curre3 === void 0 || _resetButtonRef$curre3.classList.remove('spin');
    });
  }

  /**
   * Handle search.
   *
   * @param {string} term The search term.
   */
  function searchHandler(term) {
    var count = 0;
    var groups = document.querySelectorAll('.gbm-block-group');
    if (!(groups !== null && groups !== void 0 && groups.length)) {
      return;
    }
    if (term !== '') {
      _toConsumableArray(groups).forEach(function (group) {
        var total = 0;
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block, index) {
          var str = block.dataset.title.toLowerCase();
          var found = str.search(term.toLowerCase());

          // Show/hide blocks.
          if (found !== -1) {
            block.removeAttribute('style');
            total++;
            count++;
          } else {
            block.style.display = 'none';
          }

          // Show/hide entire group if no results.
          if (theBlocks.length === index + 1) {
            if (total === 0) {
              group.style.display = 'none';
            } else {
              group.removeAttribute('style');
            }
          }
        });
      });
      setSearch({
        term: term,
        results: count
      });
    } else {
      setSearch({
        term: '',
        results: 0
      });
      _toConsumableArray(groups).forEach(function (group) {
        group.removeAttribute('style');
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block) {
          block.removeAttribute('style');
        });
      });
    }
  }

  /**
   * Clear the block search.
   */
  function clearSearch() {
    searchHandler('');
    setSearch({
      term: '',
      results: 0
    });
    var input = document.querySelector('#gbm-search');
    if (input) {
      input.value = '';
    }
  }

  /**
   * Mutate Blocks on load.
   *
   * @since 1.0
   */
  function organizeBlocks() {
    if (!(wpBlocks !== null && wpBlocks !== void 0 && wpBlocks.length) || !(wpCategories !== null && wpCategories !== void 0 && wpCategories.length)) {
      return false;
    }
    // Loop block categories to build return data with category as parent.
    var data = wpCategories.map(function (cat) {
      // Group blocks into categories.
      var filtered = wpBlocks.filter(function (block) {
        return block.category === cat.slug;
      });

      // Handle core/embed block.
      if ('embed' === cat.slug) {
        // Pluck core/embed block.
        var embedBlock = wpBlocks.find(function (block) {
          return block.category === cat.slug && block.name === 'core/embed';
        });

        // Handle variations of the embed block.
        var variations = embedBlock !== null && embedBlock !== void 0 && embedBlock.variations ? embedBlock.variations : [];

        // Loop variations and modify block name to add `variation;core/embed;` pattern.
        var modVariations = variations.map(function (item) {
          item.name = "variation;core/embed;".concat(item.name);
          return item;
        });

        // Add to block array.
        filtered.push(modVariations);

        // Concat array to top level.
        filtered = [].concat.apply([], filtered);
      }
      return {
        info: cat,
        blocks: filtered
      };
    });

    // Set blocks state.
    setBlocks(data);
  }

  // On Load
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    organizeBlocks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    callback: setLoading
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_11__["default"], {
    blocks: blocks,
    active: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.countBlocks)(blocks) - disabledBlocksCount - filterBlocksCount,
    disabled: disabledBlocksCount,
    filtered: filterBlocksCount,
    search: searchHandler
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-options"
  }, /*#__PURE__*/React.createElement("p", {
    className: "gbm-heading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select blocks below to globally removed from the WordPress Block Inserter.', 'block-manager')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Reset__WEBPACK_IMPORTED_MODULE_8__["default"], {
    ref: resetButtonRef,
    callback: resetBlocks,
    total: disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.length,
    msg: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset and activate all currently disabled blocks?', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear all disabled blocks', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Export__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ref: exportButtonRef,
    callback: exportBlocks,
    total: disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.length,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export an array of disabled blocks as a WordPress hook', 'block-manager')
  }))), /*#__PURE__*/React.createElement(_Global_SearchResults__WEBPACK_IMPORTED_MODULE_9__["default"], {
    data: search,
    callback: clearSearch,
    className: "blocks-render"
  }), !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (category) {
    var _category$blocks;
    return /*#__PURE__*/React.createElement(React.Fragment, null, !!(category !== null && category !== void 0 && (_category$blocks = category.blocks) !== null && _category$blocks !== void 0 && _category$blocks.length) && /*#__PURE__*/React.createElement(_components_Category__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: category.info.slug,
      data: category,
      toggleBlock: toggleBlock,
      disabledBlocks: disabledBlocks,
      filteredBlocks: filteredBlocks,
      callback: categoryToggleSwitch
    }));
  }))), /*#__PURE__*/React.createElement(_Global_ExportModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ref: exportModalRef,
    returnButtonRef: exportButtonRef,
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the the following code to your functions.php to remove blocks at the theme level.', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_7__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ }),

/***/ "./src/js/components/Blocks/components/Block.js":
/*!******************************************************!*\
  !*** ./src/js/components/Blocks/components/Block.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Global_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/Icon */ "./src/js/components/Global/Icon.js");
/* harmony import */ var _DisabledSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DisabledSVG */ "./src/js/components/Blocks/components/DisabledSVG.js");






/**
 * Render a Block component to display an individual block.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Array}    props.disabledBlocks Disabled blocks.
 * @param {Array}    props.filteredBlocks Filtered blocks.
 * @return {Element}                      The Block component.
 */
function Block(_ref) {
  var data = _ref.data,
    toggleBlock = _ref.toggleBlock,
    disabledBlocks = _ref.disabledBlocks,
    filteredBlocks = _ref.filteredBlocks;
  var icon = data.icon,
    name = data.name,
    title = data.title,
    description = data.description;
  var blockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var disabled = disabledBlocks !== null && disabledBlocks !== void 0 && disabledBlocks.length ? disabledBlocks.indexOf(name) !== -1 : false;
  var disabledClass = disabled ? 'disabled' : '';
  var isFiltered = filteredBlocks !== null && filteredBlocks !== void 0 && filteredBlocks.length && (filteredBlocks === null || filteredBlocks === void 0 ? void 0 : filteredBlocks.indexOf(name)) !== -1 ? true : false;
  var filteredClass = isFiltered ? 'filtered' : '';

  /**
   * Handle the click event for the block button.
   */
  function click() {
    var target = blockRef === null || blockRef === void 0 ? void 0 : blockRef.current;
    if (target) {
      var _target$dataset = target.dataset,
        id = _target$dataset.id,
        blockTitle = _target$dataset.title;
      if (!target.classList.contains('filtered')) {
        toggleBlock(target, id, blockTitle);
        target.blur();
      } else {
        // eslint-disable-next-line no-alert
        alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This block has been disabled globally via the 'gbm_disabled_blocks' hook and cannot be activated using the Block Manager interface.", 'block-manager'));
        target.blur();
      }
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    ref: blockRef,
    tabIndex: isFiltered ? -1 : null,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle Block Activation', 'block-manager'),
    "data-title": title,
    "data-description": description,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('item block-button', disabledClass, filteredClass),
    "data-id": name,
    "data-category": data.category,
    onClick: function onClick(e) {
      return click(e);
    },
    title: "[".concat(name, "]: ").concat(description)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: icon
  }), !!title && /*#__PURE__*/React.createElement("p", {
    className: "block-title",
    title: title
  }, title)), /*#__PURE__*/React.createElement(_DisabledSVG__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: disabled ? disabledClass : filteredClass
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (Block);

/***/ }),

/***/ "./src/js/components/Blocks/components/Category.js":
/*!*********************************************************!*\
  !*** ./src/js/components/Blocks/components/Category.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Category; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Block */ "./src/js/components/Blocks/components/Block.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



/**
 * Render the Category component for the category listing.
 *
 * @param {Object}   props                The component properties.
 * @param {Object}   props.data           Data for an individual block.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.callback       Function to call after category change.
 * @return {Element}                      The Category component.
 */
function Category(_ref) {
  var data = _ref.data,
    toggleBlock = _ref.toggleBlock,
    _ref$disabledBlocks = _ref.disabledBlocks,
    disabledBlocks = _ref$disabledBlocks === void 0 ? [] : _ref$disabledBlocks,
    _ref$filteredBlocks = _ref.filteredBlocks,
    filteredBlocks = _ref$filteredBlocks === void 0 ? [] : _ref$filteredBlocks,
    callback = _ref.callback;
  var _data$blocks = data.blocks,
    blocks = _data$blocks === void 0 ? [] : _data$blocks,
    info = data.info;
  var title = info.title;
  var total = blocks.length;

  // Combine disabled and filtered blocks.
  var allDisabledBlocks = [].concat(_toConsumableArray(disabledBlocks), _toConsumableArray(filteredBlocks));

  // Count disabled blocks.
  // Loop all blocks in the category and find match.
  var count = 0;
  if (allDisabledBlocks.length) {
    blocks.forEach(function (block) {
      var found = allDisabledBlocks.indexOf(block === null || block === void 0 ? void 0 : block.name);
      if (found !== -1) {
        count++;
      }
    });
  }

  // Set toggle button attributes
  var switchClass = count === total ? 'gbm-block-switch disabled' : 'gbm-block-switch';
  var state = count === total ? 'inactive' : 'active';
  return /*#__PURE__*/React.createElement("div", {
    key: data.info.slug,
    id: 'block-' + data.info.slug,
    className: "gbm-block-group",
    "data-total-blocks": data.blocks.length,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-heading"
  }, /*#__PURE__*/React.createElement("h3", null, title, /*#__PURE__*/React.createElement("span", null, "[", total - count, "/", data.blocks.length, "]")), /*#__PURE__*/React.createElement("button", {
    className: switchClass,
    "data-state": state,
    onClick: callback,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Toggle all blocks in this category', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-switch--wrap"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Toggle all blocks in this category', 'block-manager')))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list"
  }, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (block, index) {
    return /*#__PURE__*/React.createElement(_Block__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: index + block.name,
      data: block,
      toggleBlock: toggleBlock,
      disabledBlocks: disabledBlocks,
      filteredBlocks: filteredBlocks
    });
  })));
}

/***/ }),

/***/ "./src/js/components/Blocks/components/DisabledSVG.js":
/*!************************************************************!*\
  !*** ./src/js/components/Blocks/components/DisabledSVG.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DisabledSVG; }
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Render the DisabledSVG component.
 *
 * @param {Object} props           The component props.
 * @param {string} props.className Clasnames for component.
 * @return {Element}               The DisabledSVG component.
 */
function DisabledSVG(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/React.createElement("svg", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('disabled-svg', className && className)
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "100%",
    x2: "100%",
    y2: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%"
  }));
}

/***/ }),

/***/ "./src/js/components/Blocks/components/Sidebar.js":
/*!********************************************************!*\
  !*** ./src/js/components/Blocks/components/Sidebar.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Sidebar; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Global/Search */ "./src/js/components/Global/Search.js");
/* harmony import */ var _DisabledSVG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DisabledSVG */ "./src/js/components/Blocks/components/DisabledSVG.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object}   props          The component props.
 * @param {Array}    props.blocks   Array of WP Blocks.
 * @param {number}   props.active   Total number of active blocks.
 * @param {number}   props.disabled Total number of disabled blocks.
 * @param {number}   props.filtered Total number of filtered blocks.
 * @param {Function} props.search   The search handler function.
 * @return {Element}                The Sidebar component.
 */
function Sidebar(_ref) {
  var blocks = _ref.blocks,
    active = _ref.active,
    disabled = _ref.disabled,
    filtered = _ref.filtered,
    search = _ref.search;
  var activeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  var disabledRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  var mountedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(active),
    _useState2 = _slicedToArray(_useState, 2),
    activeTotal = _useState2[0],
    setActiveTotal = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(disabled),
    _useState4 = _slicedToArray(_useState3, 2),
    disabledTotal = _useState4[0],
    setDisabledTotal = _useState4[1];

  /**
   * Block total update animation.
   * @param {Element}  ref      The ref element.
   * @param {number}   value    The current value.
   * @param {Function} callback The callback function.
   */
  function change(ref, value, callback) {
    var _ref$dataset, _ref$classList;
    if (!(mountedRef !== null && mountedRef !== void 0 && mountedRef.current) || !ref) {
      return;
    }
    var prev = ref === null || ref === void 0 || (_ref$dataset = ref.dataset) === null || _ref$dataset === void 0 ? void 0 : _ref$dataset.prev;
    var direction = parseInt(prev) > value ? 'up' : 'down';
    ref === null || ref === void 0 || (_ref$classList = ref.classList) === null || _ref$classList === void 0 || _ref$classList.add("slide-".concat(direction));
    setTimeout(function () {
      var _ref$classList2, _ref$classList3;
      callback(value);
      ref === null || ref === void 0 || (_ref$classList2 = ref.classList) === null || _ref$classList2 === void 0 || _ref$classList2.add("slide-".concat(direction, "-done"));
      ref === null || ref === void 0 || (_ref$classList3 = ref.classList) === null || _ref$classList3 === void 0 || _ref$classList3.remove("slide-".concat(direction));
      setTimeout(function () {
        var _ref$classList4;
        ref === null || ref === void 0 || (_ref$classList4 = ref.classList) === null || _ref$classList4 === void 0 || _ref$classList4.remove("slide-".concat(direction, "-done"));
      }, 75);
    }, 200);
  }

  // Update the active blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    change(activeRef.current, active, setActiveTotal);
  }, [active]);

  // Update the disabled blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    setTimeout(function () {
      change(disabledRef.current, disabled, setDisabledTotal);
    }, 125);
  }, [disabled]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    setTimeout(function () {
      mountedRef.current = true;
    }, 500);
  }, []);

  /**
   * Scroll to the selected block.
   *
   * @param {Event} e The click event.
   */
  function scrollTo(e) {
    var el = e.currentTarget;
    var to = el.dataset.to;
    var target = document.querySelector("#".concat(to));
    if (target) {
      var top = target.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
      target.focus({
        preventScroll: true
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-cta-block-legend",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Current Block Status', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--total",
    title: "".concat(activeTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Active Blocks & Block Variations', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: activeRef,
    "data-prev": activeTotal
  }, activeTotal))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Active', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--disabled",
    title: disabledTotal === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Disabled Block', 'block-manager')) : "".concat(disabledTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Disabled Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: disabledRef,
    "data-prev": disabledTotal
  }, disabledTotal)), /*#__PURE__*/React.createElement(_DisabledSVG__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Disabled', 'block-manager')), !!filtered && /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--filtered",
    title: filtered === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Filtered Block', 'block-manager')) : "".concat(disabledTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Filtered Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, filtered), /*#__PURE__*/React.createElement(_DisabledSVG__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "filtered"
  }))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Filtered', 'block-manager')))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Categories', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (category) {
    var _category$blocks, _category$info, _category$info2, _category$info3;
    return /*#__PURE__*/React.createElement(React.Fragment, null, !!(category !== null && category !== void 0 && (_category$blocks = category.blocks) !== null && _category$blocks !== void 0 && _category$blocks.length) && /*#__PURE__*/React.createElement("button", {
      key: category === null || category === void 0 || (_category$info = category.info) === null || _category$info === void 0 ? void 0 : _category$info.slug,
      type: "button",
      "data-to": 'block-' + (category === null || category === void 0 || (_category$info2 = category.info) === null || _category$info2 === void 0 ? void 0 : _category$info2.slug),
      onClick: function onClick(e) {
        return scrollTo(e);
      }
    }, category === null || category === void 0 || (_category$info3 = category.info) === null || _category$info3 === void 0 ? void 0 : _category$info3.title));
  }), /*#__PURE__*/React.createElement(_Global_Search__WEBPACK_IMPORTED_MODULE_1__["default"], {
    callback: search
  }))));
}

/***/ }),

/***/ "./src/js/components/Categories/Categories.js":
/*!****************************************************!*\
  !*** ./src/js/components/Categories/Categories.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Categories; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _functions_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../functions/export */ "./src/js/functions/export.js");
/* harmony import */ var _Global_Export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Global/Export */ "./src/js/components/Global/Export.js");
/* harmony import */ var _Global_ExportModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global/ExportModal */ "./src/js/components/Global/ExportModal.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Reset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Global/Reset */ "./src/js/components/Global/Reset.js");
/* harmony import */ var _Global_SearchResults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/SearchResults */ "./src/js/components/Global/SearchResults.js");
/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Block */ "./src/js/components/Categories/components/Block.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/Categories/components/Sidebar.js");
/* harmony import */ var _functions_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../functions/helpers */ "./src/js/functions/helpers.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories
 * @return {Element}                  The Categories component.
 */
function Categories(_ref) {
  var wpBlocks = _ref.wpBlocks,
    wpCategories = _ref.wpCategories;
  var _gbm_localize = gbm_localize,
    _gbm_localize$blockCa = _gbm_localize.blockCategories,
    block_cats = _gbm_localize$blockCa === void 0 ? [] : _gbm_localize$blockCa,
    _gbm_localize$filtere = _gbm_localize.filteredCategories,
    filtered_cats = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere,
    _gbm_localize$disable = _gbm_localize.disabledBlocksAll,
    disabled_blocks = _gbm_localize$disable === void 0 ? [] : _gbm_localize$disable;
  var resetButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var exportModalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      term: '',
      results: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    notifications = _useState6[0],
    setNotifications = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(wpCategories),
    _useState8 = _slicedToArray(_useState7, 1),
    categories = _useState8[0];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(wpBlocks),
    _useState10 = _slicedToArray(_useState9, 1),
    blocks = _useState10[0];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(block_cats),
    _useState12 = _slicedToArray(_useState11, 2),
    blockCategories = _useState12[0],
    setBlockCategories = _useState12[1];
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(filtered_cats),
    _useState14 = _slicedToArray(_useState13, 1),
    filteredCategories = _useState14[0];

  // Create array containing only active block names.
  var block_names = blocks.map(function (i) {
    return i.name;
  });

  /**
   * Change the block category.
   *
   * @param {string}      block  The block ID.
   * @param {string}      title  The block title.
   * @param {HTMLElement} target The select HTML element.
   * @since 1.0
   */
  function updateCategory(block, title, target) {
    var category = target.value;
    var original = target.dataset.original;
    var type = category === original ? 'remove' : 'add';

    // Send API request.
    (0,axios__WEBPACK_IMPORTED_MODULE_12__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/category_update/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        type: type,
        block: block,
        title: title,
        category: category
      }
    }).then(function (res) {
      var data = res.data,
        status = res.status;
      if (data && status === 200 && data !== null && data !== void 0 && data.categories) {
        // Success: update state for categories and blocks.
        setBlockCategories(_toConsumableArray(data === null || data === void 0 ? void 0 : data.categories));
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: data === null || data === void 0 ? void 0 : data.msg,
            success: true
          }]);
        });
      } else {
        console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An unknown error has occurred and the block category could not be updated', 'block-manager'));
      }
    })["catch"](function (error) {
      console.warn(error);
    });
  }

  /**
   * Reset categories to default.
   */
  function resetCategories() {
    var _resetButtonRef$curre;
    resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre = resetButtonRef.current) === null || _resetButtonRef$curre === void 0 || _resetButtonRef$curre.classList.add('spin'); // Loading state.
    (0,axios__WEBPACK_IMPORTED_MODULE_12__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/category_reset/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function () {
      var _window;
      (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 || _window.reload();
    })["catch"](function (error) {
      var _resetButtonRef$curre2;
      console.warn(error);
      resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre2 = resetButtonRef.current) === null || _resetButtonRef$curre2 === void 0 || _resetButtonRef$curre2.classList.remove('spin');
    });
  }

  /**
   * Handle search.
   *
   * @param {string} term The search term.
   */
  function searchHandler(term) {
    var theBlocks = document.querySelectorAll('.gbm-blocks .gbm-block-list .item');
    if (term !== '') {
      var count = 0;
      _toConsumableArray(theBlocks).forEach(function (block) {
        var str = block.dataset.title.toLowerCase();
        var found = str.search(term.toLowerCase());
        if (found !== -1) {
          block.removeAttribute('style');
          count++;
        } else {
          block.style.display = 'none';
        }
      });
      setSearch({
        term: term,
        results: count
      });
    } else {
      setSearch({
        term: term,
        results: false
      });
      _toConsumableArray(theBlocks).forEach(function (block) {
        block.removeAttribute('style');
      });
    }
  }

  /**
   * Clear the block search.
   */
  function clearSearch() {
    searchHandler('');
    setSearch({
      term: '',
      results: false
    });
    var input = document.querySelector('#gbm-search');
    if (input) {
      input.value = '';
    }
  }

  /**
   * Export as PHP code.
   */
  function exportCategories() {
    (0,_functions_export__WEBPACK_IMPORTED_MODULE_2__.exportHook)(exportModalRef === null || exportModalRef === void 0 ? void 0 : exportModalRef.current, 'categories');
  }

  // On Load
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Export settings.
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        closeExport();
      }
    }, false);
    return function () {};
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    callback: setLoading
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper categories"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_9__["default"], {
    search: searchHandler,
    total: blocks === null || blocks === void 0 ? void 0 : blocks.length,
    updated: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    filtered: filteredCategories === null || filteredCategories === void 0 ? void 0 : filteredCategories.length,
    updatedBlocksOffset: (0,_functions_helpers__WEBPACK_IMPORTED_MODULE_10__.categoryOffsetCount)(blockCategories, disabled_blocks, block_names),
    filteredBlocksOffset: (0,_functions_helpers__WEBPACK_IMPORTED_MODULE_10__.categoryOffsetCount)(filteredCategories, disabled_blocks, block_names)
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-options"
  }, /*#__PURE__*/React.createElement("p", {
    className: "gbm-heading",
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
      // translators: %s: The number of blocks.
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Organize your %s WordPress blocks by modifying the assigned block category of each.', 'block-manager'), "<span>".concat(blocks === null || blocks === void 0 ? void 0 : blocks.length, "</span>"))
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Reset__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: resetButtonRef,
    callback: resetCategories,
    total: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    msg: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset your modified block categories?', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear all modified block categories', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Export__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ref: exportButtonRef,
    callback: exportCategories,
    total: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export an array of updated blocks categories as a WordPress hook', 'block-manager')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-group"
  }, /*#__PURE__*/React.createElement(_Global_SearchResults__WEBPACK_IMPORTED_MODULE_7__["default"], {
    data: search,
    callback: clearSearch
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list categories"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (block) {
    return /*#__PURE__*/React.createElement(_components_Block__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: "".concat(block === null || block === void 0 ? void 0 : block.name, "-").concat(block === null || block === void 0 ? void 0 : block.category),
      callback: updateCategory,
      categories: categories,
      data: block,
      filteredCategories: filteredCategories,
      blockCategories: blockCategories
    });
  })))))), /*#__PURE__*/React.createElement(_Global_ExportModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ref: exportModalRef,
    returnButtonRef: exportButtonRef,
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the the following code to your functions.php to update block categories at the theme level.', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_11__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ }),

/***/ "./src/js/components/Categories/components/Block.js":
/*!**********************************************************!*\
  !*** ./src/js/components/Categories/components/Block.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Block; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Global_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Global/Icon */ "./src/js/components/Global/Icon.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props                    The component properties.
 * @param {Object}   props.data               Data for an individual block.
 * @param {Array}    props.categories         Array of block categories.
 * @param {Function} props.callback           Function to call after category change.
 * @param {Array}    props.filteredCategories Array of filtered cateogries.
 * @param {Array}    props.blockCategories    Array of updated cateogries.
 * @return {Element}                          The Block component.
 */
function Block(_ref) {
  var data = _ref.data,
    categories = _ref.categories,
    callback = _ref.callback,
    filteredCategories = _ref.filteredCategories,
    blockCategories = _ref.blockCategories;
  var selectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  var name = data.name,
    icon = data.icon,
    title = data.title,
    category = data.category,
    orginalCategory = data.orginalCategory;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(category),
    _useState2 = _slicedToArray(_useState, 2),
    activeCategory = _useState2[0],
    setActiveCategory = _useState2[1];

  // Is this block category filtered?
  var filtered = filteredCategories === null || filteredCategories === void 0 ? void 0 : filteredCategories.find(function (cat) {
    return cat.block === name;
  });

  // Is this block category updated?
  var updated = blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.find(function (cat) {
    return cat.block === name;
  });
  function handler() {
    var _selectRef$current;
    callback(name, title, selectRef === null || selectRef === void 0 ? void 0 : selectRef.current);
    setActiveCategory(selectRef === null || selectRef === void 0 || (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.value);
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-title": title,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('item', 'gbm-category', updated ? 'updated' : null, filtered ? 'filtered' : null),
    "data-id": name
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-category-wrap"
  }, /*#__PURE__*/React.createElement(_Global_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    icon: icon
  }), /*#__PURE__*/React.createElement("p", {
    title: name
  }, title, /*#__PURE__*/React.createElement("span", null, name))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-category-wrap category-switch"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "select-".concat(name),
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Update block category', 'block-manager')), /*#__PURE__*/React.createElement("select", {
    defaultValue: category,
    onChange: function onChange() {
      return handler();
    },
    id: "select-".concat(name),
    "data-original": orginalCategory,
    disabled: filtered,
    ref: selectRef
  }, !!(categories !== null && categories !== void 0 && categories.length) && categories.map(function (cat, index) {
    return /*#__PURE__*/React.createElement("option", {
      key: "".concat(cat.slug, "-").concat(index),
      value: cat.slug
    }, cat.title, orginalCategory !== activeCategory && orginalCategory === cat.slug ? " - [".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'block-manager'), "]") : null);
  }))));
}

/***/ }),

/***/ "./src/js/components/Categories/components/Sidebar.js":
/*!************************************************************!*\
  !*** ./src/js/components/Categories/components/Sidebar.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Sidebar; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Global/Search */ "./src/js/components/Global/Search.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 * Render the Sidebar for Category Manager.
 *
 * @param {Object}   props                      The component properties.
 * @param {Function} props.search               The search handler function.
 * @param {number}   props.total                Total blocks.
 * @param {number}   props.updated              Updated block categories.
 * @param {number}   props.filtered             Total number of filtered block categories.
 * @param {number}   props.updatedBlocksOffset  Total number of disabled blocks to offset the count.
 * @param {number}   props.filteredBlocksOffset Total number of filtered blocks to offset the count.
 * @return {Element}                            The Sidebar component.
 */
function Sidebar(_ref) {
  var search = _ref.search,
    total = _ref.total,
    updated = _ref.updated,
    filtered = _ref.filtered,
    updatedBlocksOffset = _ref.updatedBlocksOffset,
    filteredBlocksOffset = _ref.filteredBlocksOffset;
  var updatedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var mountedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(updated - updatedBlocksOffset),
    _useState2 = _slicedToArray(_useState, 2),
    updatedTotal = _useState2[0],
    setUpdatedTotal = _useState2[1];

  /**
   * Block total update animation.
   * @param {Element}  ref      The ref element.
   * @param {number}   value    The current value.
   * @param {Function} callback The callback function.
   */
  function change(ref, value, callback) {
    var _ref$dataset, _ref$classList;
    if (!(mountedRef !== null && mountedRef !== void 0 && mountedRef.current) || !ref) {
      return;
    }
    var prev = ref === null || ref === void 0 || (_ref$dataset = ref.dataset) === null || _ref$dataset === void 0 ? void 0 : _ref$dataset.prev;
    var direction = parseInt(prev) > value ? 'up' : 'down';
    ref === null || ref === void 0 || (_ref$classList = ref.classList) === null || _ref$classList === void 0 || _ref$classList.add("slide-".concat(direction));
    setTimeout(function () {
      var _ref$classList2, _ref$classList3;
      callback(value);
      ref === null || ref === void 0 || (_ref$classList2 = ref.classList) === null || _ref$classList2 === void 0 || _ref$classList2.add("slide-".concat(direction, "-done"));
      ref === null || ref === void 0 || (_ref$classList3 = ref.classList) === null || _ref$classList3 === void 0 || _ref$classList3.remove("slide-".concat(direction));
      setTimeout(function () {
        var _ref$classList4;
        ref === null || ref === void 0 || (_ref$classList4 = ref.classList) === null || _ref$classList4 === void 0 || _ref$classList4.remove("slide-".concat(direction, "-done"));
      }, 75);
    }, 200);
  }

  // Update the updated blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    change(updatedRef.current, updated - updatedBlocksOffset, setUpdatedTotal);
  }, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      mountedRef.current = true;
    }, 500);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-cta-block-legend",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current Block Status', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--total",
    title: "".concat(total, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, total))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blocks', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--updated",
    title: updatedTotal === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated Block Category', 'block-manager')) : "".concat(updatedTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated Block Categories', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: updatedRef,
    "data-prev": updatedRef
  }, updatedTotal))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated', 'block-manager')), !!filtered && /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--filtered",
    title: filtered === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Block Category', 'block-manager')) : "".concat(filtered, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Block Categories', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, filtered - filteredBlocksOffset))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered', 'block-manager')))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Block Manager Category Switcher provides functionality for updating the categories of WordPress blocks.', 'block-manager')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modifying a category will update the blocks location in the Block Inserter while editing posts.', 'block-manager')), /*#__PURE__*/React.createElement(_Global_Search__WEBPACK_IMPORTED_MODULE_2__["default"], {
    callback: search
  }))));
}

/***/ }),

/***/ "./src/js/components/Global/Export.js":
/*!********************************************!*\
  !*** ./src/js/components/Global/Export.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Export blocks button.
 *
 * @return {Element} The Export component.
 */
var Export = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function Export(props, ref) {
  var callback = props.callback,
    _props$total = props.total,
    total = _props$total === void 0 ? 0 : _props$total,
    title = props.title;
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    onClick: function onClick() {
      return callback();
    },
    title: title,
    disabled: total < 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-database-export"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export', 'block-manager'));
});
/* harmony default export */ __webpack_exports__["default"] = (Export);

/***/ }),

/***/ "./src/js/components/Global/ExportModal.js":
/*!*************************************************!*\
  !*** ./src/js/components/Global/ExportModal.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_copyToClipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../functions/copyToClipboard */ "./src/js/functions/copyToClipboard.js");




/**
 * Render the ExportModal overlay.
 *
 * @return {Element} The ExportModal component.
 */
var ExportModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function ExportModal(props, ref) {
  var data = props.data,
    returnButtonRef = props.returnButtonRef,
    desc = props.desc;
  var copyButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var codeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  /**
   * Close modal.
   */
  function close() {
    ref.current.classList.remove('active');
    setTimeout(function () {
      if (returnButtonRef !== null && returnButtonRef !== void 0 && returnButtonRef.current) {
        // Move focus back to the previous element.
        returnButtonRef.current.focus({
          preventSrcoll: true
        });
      }
    }, 150);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Export settings.
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        close();
      }
    }, false);
    return function () {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-export-modal",
    ref: ref,
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-export-modal--inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "button button-primary",
    onClick: function onClick() {
      return (0,_functions_copyToClipboard__WEBPACK_IMPORTED_MODULE_2__["default"])(codeRef.current, copyButtonRef.current);
    },
    ref: copyButtonRef
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy Code', 'block-manager')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "button",
    onClick: function onClick() {
      return close();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close', 'block-manager')))), /*#__PURE__*/React.createElement("code", {
    id: "gbm-export",
    contentEditable: "true",
    suppressContentEditableWarning: true,
    ref: codeRef
  }, data)));
});
/* harmony default export */ __webpack_exports__["default"] = (ExportModal);

/***/ }),

/***/ "./src/js/components/Global/Icon.js":
/*!******************************************!*\
  !*** ./src/js/components/Global/Icon.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Icon; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Block Icon display.
 *
 * @param {Object} props      The component properties.
 * @param {string} props.icon The icon source - svg or string.
 * @return {Element}          The Icon component.
 */
function Icon(_ref) {
  var icon = _ref.icon;
  var src = (icon === null || icon === void 0 ? void 0 : icon.src) || icon;

  // Exit if icon src is block default
  if (src === 'block-default') {
    return null;
  }

  // If icon is a function, render it.
  if (typeof src === 'function') {
    if (src.toString().indexOf('createElement') >= 0) {
      src = src();
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "icon",
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.renderToString)(src)
    }
  });
}

/***/ }),

/***/ "./src/js/components/Global/Loader.js":
/*!********************************************!*\
  !*** ./src/js/components/Global/Loader.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Loader; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Loader component.
 *
 * @param {Object}   props          The component props.
 * @param {Function} props.callback The callback function.
 * @return {Element}                The Loader component.
 */
function Loader(_ref) {
  var callback = _ref.callback;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      callback();
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader-pulse-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader-pulse"
  })), /*#__PURE__*/React.createElement("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching Blocks and Categories', 'block-manager'), "\u2026")));
}

/***/ }),

/***/ "./src/js/components/Global/Notifications.js":
/*!***************************************************!*\
  !*** ./src/js/components/Global/Notifications.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Notifications; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the ToNotificationsastList component.
 *
 * @param {Object}   props                  The component properties.
 * @param {Array}    props.notifications    The list of notifications to display.
 * @param {Function} props.setNotifications The callback function to remove a notification.
 * @return {Element}                        The Notifications component.
 */
function Notifications(_ref) {
  var notifications = _ref.notifications,
    setNotifications = _ref.setNotifications;
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-notification-list",
    "aria-live": "assertive"
  }, !!(notifications !== null && notifications !== void 0 && notifications.length) && notifications.map(function (item) {
    return /*#__PURE__*/React.createElement(Notification, {
      key: "notification-".concat(item.id),
      id: item.id,
      msg: item === null || item === void 0 ? void 0 : item.msg,
      success: item === null || item === void 0 ? void 0 : item.success,
      callback: setNotifications
    });
  }));
}

/**
 * Render an individual Notification display.
 *
 * @param {Object}   props          The component properties.
 * @param {string}   props.id       Notification ID.
 * @param {string}   props.msg      Message to display.
 * @param {boolean}  props.success  Type of message.
 * @param {Function} props.callback Function to call after message is displayed.
 * @return {Element}                The Notification component.
 */
function Notification(_ref2) {
  var id = _ref2.id,
    _ref2$msg = _ref2.msg,
    msg = _ref2$msg === void 0 ? '' : _ref2$msg,
    _ref2$success = _ref2.success,
    success = _ref2$success === void 0 ? true : _ref2$success,
    callback = _ref2.callback;
  var ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Use timeouts to display and then remove the notification.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _ref$current;
    ref === null || ref === void 0 || (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.classList.add('active');
    if (msg) {
      setTimeout(function () {
        var _ref$current2;
        ref === null || ref === void 0 || (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || _ref$current2.classList.add('out');
        setTimeout(function () {
          // Add an extra long delay before deleting the notification.
          removeNotification(id, callback);
        }, 1000);
      }, 3000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--".concat(success ? 'success' : 'error')),
    role: "alert",
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-".concat(success ? 'yes-alt' : 'no')
  }), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: msg
    }
  })));
}

/**
 * Remove a notification.
 *
 * @param {string}   id       The notification ID.
 * @param {Function} callback Function to call after updating state.
 */
function removeNotification(id, callback) {
  callback(function (prev) {
    return prev.filter(function (notification) {
      return notification.id !== id;
    });
  });
}

/* eslint-disable no-unused-vars */
function TestNotifications() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--success", 'active'),
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-yes-alt"
  }), /*#__PURE__*/React.createElement("span", null, "Block Activated")), /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--error", 'active'),
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-no"
  }), /*#__PURE__*/React.createElement("span", null, "Error Accessing API")));
}
/* eslint-enable no-unused-vars */

/***/ }),

/***/ "./src/js/components/Global/Reset.js":
/*!*******************************************!*\
  !*** ./src/js/components/Global/Reset.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Reset blocks button.
 *
 * @return {Element} The Reset component.
 */
var Reset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function Reset(props, ref) {
  var callback = props.callback,
    _props$total = props.total,
    total = _props$total === void 0 ? 0 : _props$total,
    msg = props.msg,
    title = props.title;

  /**
   * Confirm user wants to clear disabled blocks.
   */
  function confirm() {
    var _window;
    if ( // eslint-disable-next-line no-alert
    (_window = window) !== null && _window !== void 0 && _window.confirm(msg)) {
      callback();
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    onClick: function onClick() {
      return confirm();
    },
    title: title,
    disabled: total < 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-update-alt"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset', 'block-manager'));
});
/* harmony default export */ __webpack_exports__["default"] = (Reset);

/***/ }),

/***/ "./src/js/components/Global/Search.js":
/*!********************************************!*\
  !*** ./src/js/components/Global/Search.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Search; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the block Search component.
 *
 * @param {Object}   props          The component properties.
 * @param {Function} props.callback The callback function to dispatch.
 * @return {Element}                The Search component.
 */
function Search(_ref) {
  var callback = _ref.callback;
  var inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-search"
  }, /*#__PURE__*/React.createElement("label", {
    className: "offscreen",
    htmlFor: "gbm-search"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Blocks', 'block-manager')), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "gbm-search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Blocks', 'block-manager'),
    onKeyUp: function onKeyUp() {
      var _inputRef$current;
      return callback(inputRef === null || inputRef === void 0 || (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.value);
    },
    ref: inputRef
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _inputRef$current2;
      return callback(inputRef === null || inputRef === void 0 || (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.value);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Submit', 'block-manager')), /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-search"
  })));
}

/***/ }),

/***/ "./src/js/components/Global/SearchResults.js":
/*!***************************************************!*\
  !*** ./src/js/components/Global/SearchResults.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SearchResults; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the SearchResults component.
 *
 * @param {Object}   props           The component properties.
 * @param {Object}   props.data      The search data.
 * @param {Function} props.callback  Trigger the reset search function.
 * @param {string}   props.className Optional div classname.
 * @return {Element}                 The SearchResults component.
 */
function SearchResults(_ref) {
  var data = _ref.data,
    callback = _ref.callback,
    className = _ref.className;
  return /*#__PURE__*/React.createElement(React.Fragment, null, !!(data !== null && data !== void 0 && data.term) && /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-search-results', className && className)
  }, (data === null || data === void 0 ? void 0 : data.results) > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      // translators: 1: The search term. 2: Total results.
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your block search for %1$s returned %2$s result(s)', 'block-manager'), "<strong>".concat(data === null || data === void 0 ? void 0 : data.term, "</strong>"), "<strong>".concat(data === null || data === void 0 ? void 0 : data.results, "</strong>"))
    }
  }), /*#__PURE__*/React.createElement("span", null, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: callback
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear Search', 'block-manager'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "gbm-no-results",
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      // translators: The search term
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No blocks found for %s', 'block-manager'), "<strong>".concat(data === null || data === void 0 ? void 0 : data.term, "</strong>"))
    }
  }), /*#__PURE__*/React.createElement("span", null, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: callback
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear Search', 'block-manager')))));
}

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excludedBlocks: function() { return /* binding */ excludedBlocks; }
/* harmony export */ });
var excludedBlocks = ['core/missing', 'core/text-columns', 'core/navigation-submenu'
//"core/pattern",
//"core/post-navigation-link",
];

/***/ }),

/***/ "./src/js/functions/blocks.js":
/*!************************************!*\
  !*** ./src/js/functions/blocks.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countBlocks: function() { return /* binding */ countBlocks; },
/* harmony export */   getBlockCategoryData: function() { return /* binding */ getBlockCategoryData; },
/* harmony export */   getBlocksData: function() { return /* binding */ getBlocksData; }
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/js/functions/helpers.js");


/**
 * Get array of blocks for the Category listing.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
function getBlockCategoryData(blocks) {
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.removeDisabledBlocks)((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.setBlockCategory)((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.sortBlocks)(blocks)));
}

/**
 * Get all WP blocks with updated categories.
 *
 * @param {Array} blocks             Array of WP Blocks.
 * @param {Array} filteredCategories The filtered categories.
 * @return {Array}                   The list of blocks.
 */
function getBlocksData(blocks) {
  var filteredCategories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }

  // Get and sort blocks.
  var wpBlocks = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.sortBlocks)(blocks);

  // Update block categories.
  if (filteredCategories !== null && filteredCategories !== void 0 && filteredCategories.length) {
    // Loop saved categories.
    filteredCategories.forEach(function (item) {
      var name = item.block,
        category = item.cat;

      // Find block by name and update category.
      var match = wpBlocks.find(function (block) {
        return block.name === name;
      });
      if (match) {
        match.category = category;
      }
    });
  }
  return wpBlocks;
}

/**
 * Count total blocks including variations.
 * Loop blocks and return total count.
 *
 * @param {Array} blocks Array of blocks with parent categories
 * @return {number}      Total number of blocks
 */
function countBlocks(blocks) {
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return 0;
  }
  var count = 0;
  blocks.forEach(function (category) {
    var _category$blocks;
    count += category === null || category === void 0 || (_category$blocks = category.blocks) === null || _category$blocks === void 0 ? void 0 : _category$blocks.length;
  });
  return count;
}

/***/ }),

/***/ "./src/js/functions/copyToClipboard.js":
/*!*********************************************!*\
  !*** ./src/js/functions/copyToClipboard.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ copyToClipboard; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Copy export code to clipboard.
 *
 * @param {Element} input   The code input element.
 * @param {Element} trigger The button trigger element.
 */
function copyToClipboard(input, trigger) {
  var _window;
  if (!input) return;
  var range = document.createRange();
  range.selectNodeContents(input);
  var sel = (_window = window) === null || _window === void 0 ? void 0 : _window.getSelection(); //eslint-disable-line
  sel.removeAllRanges();
  sel.addRange(range);

  // Copy to clipboard.
  document.execCommand('copy');
  if (trigger) {
    // Set the Copy button text.
    trigger.innerHTML = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Copied', 'block-manager');
    setTimeout(function () {
      trigger.disabled = true;
    }, 500);
  }
}

/***/ }),

/***/ "./src/js/functions/export.js":
/*!************************************!*\
  !*** ./src/js/functions/export.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportHook: function() { return /* binding */ exportHook; }
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");


/**
 * Export as PHP code.
 *
 * @param {Element} ref  The export modal reference.
 * @param {string}  type The type of export.
 */
function exportHook(ref) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'blocks';
  ref === null || ref === void 0 || ref.classList.add('active'); // Loading state.

  var hook = type === 'blocks' ? 'gbm_disabled_blocks' : 'gbm_block_categories';
  (0,axios__WEBPACK_IMPORTED_MODULE_0__["default"])({
    method: 'GET',
    url: "".concat(gbm_localize.root, "gbm/export/?type=").concat(type),
    headers: {
      'X-WP-Nonce': gbm_localize.nonce,
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    var data = res.data,
      status = res.status;
    if (status === 200 && data !== null && data !== void 0 && data.success && data !== null && data !== void 0 && data.code) {
      var code = '';

      // Blocks return data.
      if (type === 'blocks') {
        code = data.code;
        code = code.replace(/\\/g, ''); // Replace `\`.
        code = code.replace(/"/g, "'"); // Replace `"`.
        code = code.replace(/,'/g, ", '"); // Replace `,'`.
      }

      // Category return data.
      if (type === 'categories') {
        var entries = JSON.parse(data.code);
        if (entries !== null && entries !== void 0 && entries.length) {
          code = '[';
          entries.forEach(function (entry, index) {
            code += '[';
            code += "'block' => '".concat(entry.block, "', 'cat' => '").concat(entry.cat, "'");
            code += ']';
            code += index === entries.length - 1 ? '' : ', ';
          });
          code += ']';
        }
      }
      var results = "// functions.php<br/>add_filter( '".concat(hook, "', function() {<br/>&nbsp;&nbsp;&nbsp;return ").concat(code, ";<br/>} );");
      var target = ref === null || ref === void 0 ? void 0 : ref.querySelector('#gbm-export');
      target.innerHTML = results;
      setTimeout(function () {
        target.focus();
      }, 250);
    } else {
      console.warn(__('There was an error fetching export data.', 'block-manager'));
      ref === null || ref === void 0 || ref.classList.remove('active');
    }
  })["catch"](function (error) {
    console.warn(error);
    ref === null || ref === void 0 || ref.classList.remove('active');
  });
}

/***/ }),

/***/ "./src/js/functions/getCategoryData.js":
/*!*********************************************!*\
  !*** ./src/js/functions/getCategoryData.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCategoryData; }
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Get all WP block categories.
 *
 * @return {Array} The array of categories.
 */
function getCategoryData() {
  var wpCategories = [];

  // Get WP Block Categories
  var categories = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getCategories)();
  if (categories !== null && categories !== void 0 && categories.length) {
    // Sort categories by name.
    wpCategories = categories.sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0; // eslint-disable-line
    });

    // Filter categories for `reusable`.
    wpCategories = wpCategories.filter(function (cat) {
      return cat.slug !== 'reusable';
    });
  }
  return wpCategories;
}

/***/ }),

/***/ "./src/js/functions/helpers.js":
/*!*************************************!*\
  !*** ./src/js/functions/helpers.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   categoryOffsetCount: function() { return /* binding */ categoryOffsetCount; },
/* harmony export */   removeDisabledBlocks: function() { return /* binding */ removeDisabledBlocks; },
/* harmony export */   setBlockCategory: function() { return /* binding */ setBlockCategory; },
/* harmony export */   sortBlocks: function() { return /* binding */ sortBlocks; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");


/**
 * Sort the blocks alpha and then remove excluded blocks.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       The sorted array of blocks.
 */
function sortBlocks(blocks) {
  return blocks.sort(function (a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0; //eslint-disable-line
  }).filter(function (block) {
    return _constants__WEBPACK_IMPORTED_MODULE_0__.excludedBlocks.indexOf(block.name) === -1;
  });
}

/**
 * Remove all disabled blocks from blocks array.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
function removeDisabledBlocks() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }
  var _gbm_localize = gbm_localize,
    _gbm_localize$disable = _gbm_localize.disabledBlocksAll,
    disabled = _gbm_localize$disable === void 0 ? [] : _gbm_localize$disable;
  if (!(disabled !== null && disabled !== void 0 && disabled.length)) {
    return blocks;
  }
  return blocks === null || blocks === void 0 ? void 0 : blocks.filter(function (block) {
    return !(disabled !== null && disabled !== void 0 && disabled.includes(block === null || block === void 0 ? void 0 : block.name));
  });
}

/**
 * Set block categories.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Modified blocks with categories.
 */
function setBlockCategory() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _gbm_localize2 = gbm_localize,
    _gbm_localize2$filter = _gbm_localize2.filteredCategoriesAll,
    filteredCategoriesAll = _gbm_localize2$filter === void 0 ? [] : _gbm_localize2$filter;
  return blocks.map(function (block) {
    if (filteredCategoriesAll !== null && filteredCategoriesAll !== void 0 && filteredCategoriesAll.length) {
      var match = filteredCategoriesAll.find(function (item) {
        return item.block === block.name;
      });
      if (match) {
        block.orginalCategory = block.category;
        block.category = match.cat;
      } else {
        block.orginalCategory = block.category;
      }
    }
    return block;
  });
}

/**
 * Filter blocks to see if they are disabled or not active(installed) on the site.
 *
 * @param {Array} data        The data to filter.
 * @param {Array} disabled    Array of disabled blocks.
 * @param {Array} block_names Array of block names.
 * @return {number}           Length of the array.
 */
function categoryOffsetCount(data, disabled, block_names) {
  return data.filter(function (item) {
    // Increment count if block is disabled or not in the block_names array.
    return disabled.includes(item.block) || !block_names.includes(item === null || item === void 0 ? void 0 : item.block);
  }).length;
}

/***/ }),

/***/ "./src/js/helpers/otherPlugins.js":
/*!****************************************!*\
  !*** ./src/js/helpers/otherPlugins.js ***!
  \****************************************/
/***/ (function() {

/**
 * Toggle Other Plugins display.
 */
var otherPluginsClick = function otherPluginsClick() {
  var otherPluginsDiv = document.getElementById('gbm-other-plugins');
  if (!otherPluginsDiv) {
    return false;
  }
  if (otherPluginsDiv.style.display === 'block') {
    otherPluginsDiv.style.display = 'none';
  } else {
    otherPluginsDiv.style.display = 'block';
  }
  var container = document.getElementById('gbm-container');
  container.focus({
    preventScroll: true
  });
};
var otherPluginsBtn = document.getElementById('otherPlugins');
var otherPluginsClose = document.getElementById('otherPluginsClose');
if (otherPluginsBtn) {
  otherPluginsBtn.addEventListener('click', otherPluginsClick);
  otherPluginsClose.addEventListener('click', otherPluginsClick);
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-library":
/*!**************************************!*\
  !*** external ["wp","blockLibrary"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockLibrary"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/axios/lib/adapters/adapters.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_1__["default"]
}

_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(adapter) || adapter === null || adapter === false;

/* harmony default export */ __webpack_exports__["default"] = ({
  getAdapter: (adapters) => {
    adapters = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
});


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../helpers/cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = (0,_helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ __webpack_exports__["default"] = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFormData(requestData)) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if(!requestHeaders.getContentType(/^\s*multipart\/form-data/)){
        requestHeaders.setContentType('multipart/form-data'); // mobile/desktop app frameworks
      } else if(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString(contentType = requestHeaders.getContentType())){
        // fix semicolon duplication issue for ReactNative FormData implementation
        requestHeaders.setContentType(contentType.replace(/^\s*(multipart\/form-data);+/, '$1'))
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = (0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__["default"])(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__["default"];
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || (0,_helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__["default"])(fullPath))
        && config.xsrfCookieName && _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__["default"].read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__["default"](null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__["default"])(fullPath);

    if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].protocols.indexOf(protocol) === -1) {
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, context, {allOwnKeys: true});

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_8__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__["default"];

axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__["default"];

axios.default = axios;

// this module should only have a default export
/* harmony default export */ __webpack_exports__["default"] = (axios);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CancelToken);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  __CANCEL__: true
});

/* harmony default export */ __webpack_exports__["default"] = (CanceledError);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isCancel; }
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");











const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].merge(
      headers.common,
      headers[config.method]
    );

    headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__["default"])(config.baseURL, config.url);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ __webpack_exports__["default"] = (Axios);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ __webpack_exports__["default"] = (AxiosError);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ __webpack_exports__["default"] = (AxiosHeaders);


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (InterceptorManager);


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buildFullPath; }
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL)) {
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ dispatchRequest; }
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"].adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
      config,
      config.transformResponse,
      response
    );

    response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__["default"])(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeConfig; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({caseless}, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ settle; }
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ transformData; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

    if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__["default"])(data)) : data;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data)
    ) {
      return data;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data, this.formSerializer).toString();
      }

      if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ __webpack_exports__["default"] = (defaults);


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: function() { return /* binding */ VERSION; }
/* harmony export */ });
const VERSION = "1.5.1";

/***/ }),

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ __webpack_exports__["default"] = (AxiosURLSearchParams);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ __webpack_exports__["default"] = (HttpStatusCode);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ bind; }
/* harmony export */ });


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buildURL; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
      params.toString() :
      new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ combineURLs; }
/* harmony export */ });


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");





/* harmony default export */ __webpack_exports__["default"] = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(path)) {
          cookie.push('path=' + path);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ __webpack_exports__["default"] = (formDataToJSON);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isAbsoluteURL; }
/* harmony export */ });


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isAxiosError; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");





/* harmony default export */ __webpack_exports__["default"] = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line strict
/* harmony default export */ __webpack_exports__["default"] = (null);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ __webpack_exports__["default"] = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ parseProtocol; }
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/speedometer.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (speedometer);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ spread; }
/* harmony export */ });


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/node/classes/FormData.js */ "./node_modules/axios/lib/helpers/null.js");




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSpecCompliantForm(formData);

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]')) && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(
        formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ __webpack_exports__["default"] = (toFormData);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toURLEncodedForm; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  assertOptions,
  validators
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/Blob.js":
/*!*****************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/Blob.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = (typeof Blob !== 'undefined' ? Blob : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js":
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = (typeof FormData !== 'undefined' ? FormData : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ __webpack_exports__["default"] = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");
/* harmony import */ var _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Blob.js */ "./node_modules/axios/lib/platform/browser/classes/Blob.js");




/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


/* harmony default export */ __webpack_exports__["default"] = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob: _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");




// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

/* harmony default export */ __webpack_exports__["default"] = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
});


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"block-manager-admin": 0,
/******/ 			"./style-block-manager-admin": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkblock_manager"] = self["webpackChunkblock_manager"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-block-manager-admin"], function() { return __webpack_require__("./src/js/admin.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=block-manager-admin.js.map