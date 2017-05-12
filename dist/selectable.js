(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vueSelectable", [], factory);
	else if(typeof exports === 'object')
		exports["vueSelectable"] = factory();
	else
		root["vueSelectable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selectable = function () {
    /**
     *
     * @param {HTMLElement} selectBox selection box element
     * @param {HTMLElement} boundingBox element that limits where selection can be made
     * @param {Object} options misc selection options
     */
    function selectable(selectBox) {
        var _this = this;

        var boundingBox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, selectable);

        Object.assign(this, {
            selectBox: selectBox,
            rootElement: document,
            boundingBox: boundingBox,
            dragging: false,
            startX: null,
            startY: null,
            endX: null,
            endY: null,
            selectables: [],
            selected: [],
            selectedSetter: null,
            selectedGetter: null,
            selectingSetter: null,
            selecting: [],
            addMode: false,
            handlers: {
                mousedown: this.mouseDown.bind(this),
                mouseup: this.mouseUp.bind(this),
                mousemove: this.mouseMove.bind(this)
            },
            renderSelected: true,
            renderSelecting: true,
            selectingClass: 'selecting',
            selectedClass: 'selected'
        }, options);

        Object.keys(this.handlers).forEach(function (event) {
            return _this.rootElement.addEventListener(event, _this.handlers[event]);
        });

        var selectBoxStart = selectable.absBox(selectBox);
        var bb = selectable.absBox(boundingBox);
        this.selectBoxStartX = bb.left - selectBoxStart.left;
        this.selectBoxStartY = bb.top - selectBoxStart.top;
    }

    /**
     * Removes all registered event handlers and clears references to DOM nodes
     */


    _createClass(selectable, [{
        key: 'detach',
        value: function detach() {
            var _this2 = this;

            Object.keys(this.handlers).forEach(function (event) {
                return _this2.rootElement.removeEventListener(event, _this2.handlers[event]);
            });
            this.selectables = [];
            this.selectBox = null;
            this.boundingBox = null;
            this.rootElement = null;
        }

        /**
         * Updates list of selectable items
         * @param {Element[]} elements
         */

    }, {
        key: 'setSelectables',
        value: function setSelectables(elements) {
            this.selectables = elements;
            this.selected = elements.map(function (i) {
                return false;
            });
            if (typeof this.selectedSetter === 'function') {
                this.selectedSetter(this.selected);
            }
        }

        /**
         * Mouse key down handler
         * @param {MouseEvent} e
         */

    }, {
        key: 'mouseDown',
        value: function mouseDown(e) {
            if (e.button !== 0) {
                return;
            }
            var bb = selectable.absBox(this.boundingBox);
            if (e.pageX < bb.left || e.pageX > bb.width + bb.left || e.pageY < bb.top || e.pageY > bb.height + bb.top) {
                return;
            }
            e.preventDefault();

            var _bound = this.bound(e),
                _bound2 = _slicedToArray(_bound, 2),
                x = _bound2[0],
                y = _bound2[1];

            this.startX = x;
            this.startY = y;
            this.endX = x;
            this.endY = y;
            this.dragging = true;
            this.selecting = this.selectables.map(function (i) {
                return false;
            }); // reset all selection
            if (typeof this.selectingSetter === 'function') {
                this.selectingSetter(this.selecting);
            }
            this.addMode = e.ctrlKey;
            if (!this.addMode) {
                this.selected = this.selecting;
                if (typeof this.selectedSetter === 'function') {
                    this.selectedSetter(this.selected);
                }
            } else if (typeof this.selectedGetter === 'function') {
                var gotSelection = this.selectedGetter() || [];
                this.selected = this.selectables.map(function (v, i) {
                    return !!gotSelection[i];
                });
            }
            this.updateSelection();
            this.render();
        }

        /**
         * Mouse key up handler
         * @param {MouseEvent} e
         */

    }, {
        key: 'mouseUp',
        value: function mouseUp(e) {
            var _this3 = this;

            if (this.dragging) {
                if (e.button !== 0) {
                    return;
                }
                e.preventDefault();

                var _bound3 = this.bound(e),
                    _bound4 = _slicedToArray(_bound3, 2),
                    x = _bound4[0],
                    y = _bound4[1];

                this.endX = x;
                this.endY = y;
                this.dragging = false;
                this.updateSelection();
                if (typeof this.selectedGetter === 'function') {
                    var gotSelection = this.selectedGetter() || [];
                    this.selected = this.selectables.map(function (v, i) {
                        return !!gotSelection[i];
                    });
                }
                this.selected = this.addMode ? this.selected.map(function (v, i) {
                    return v || _this3.selecting[i];
                }) : this.selecting;
                if (typeof this.selectedSetter === 'function') {
                    this.selectedSetter(this.selected);
                }
                this.selecting = [];
                if (this.selectingSetter) {
                    this.selectingSetter(this.selecting);
                }
                this.render();
            }
        }

        /**
         * Mouse move handler
         * @param {MouseEvent} e
         */

    }, {
        key: 'mouseMove',
        value: function mouseMove(e) {
            if (this.dragging) {
                var _bound5 = this.bound(e),
                    _bound6 = _slicedToArray(_bound5, 2),
                    x = _bound6[0],
                    y = _bound6[1];

                this.endX = x;
                this.endY = y;
                this.updateSelection();
                this.render();
            }
        }

        /**
         * Returns [x, y] coordinates from mouse event limited to selection area
         * @param {MouseEvent} e
         * @return {[int, int]}
         */

    }, {
        key: 'bound',
        value: function bound(e) {
            var bb = selectable.absBox(this.boundingBox);
            return [Math.min(Math.max(bb.left, e.pageX), bb.width + bb.left), Math.min(Math.max(bb.top, e.pageY), bb.height + bb.top)];
        }

        /**
         * Returns element's absolute position (on the page) and size
         * @param {Element} element
         * @return {{top: number, left: number, width: Number, height: Number}}
         */

    }, {
        key: 'updateSelection',


        /**
         * Updates list of selected items (under current selection box)
         */
        value: function updateSelection() {
            var s = this.getSelectionBox();
            this.selecting = this.selectables.map(selectable.absBox).map(function (b) {
                return Math.abs((s.left - b.left) * 2 + s.width - b.width) < s.width + b.width && Math.abs((s.top - b.top) * 2 + s.height - b.height) < s.height + b.height;
            });
            if (this.selectingSetter) {
                this.selectingSetter(this.selecting);
            }
        }

        /**
         * Gets size and relative position of selection box
         * @return {{left: number, top: number, width: number, height: number}}
         */

    }, {
        key: 'getSelectionBox',
        value: function getSelectionBox() {
            return {
                left: Math.min(this.startX, this.endX),
                top: Math.min(this.startY, this.endY),
                width: Math.abs(this.startX - this.endX),
                height: Math.abs(this.startY - this.endY)
            };
        }

        /**
         * Renders visible state for selectable items
         */

    }, {
        key: 'renderSelection',
        value: function renderSelection() {
            var _this4 = this;

            if (!this.renderSelected && !this.renderSelecting) {
                return;
            }
            this.selectables.forEach(function (e, i) {
                if (_this4.renderSelecting) {
                    if (_this4.dragging && !!_this4.selecting[i]) {
                        e.classList.add(_this4.selectingClass);
                    } else {
                        e.classList.remove(_this4.selectingClass);
                    }
                }
                if (_this4.renderSelected) {
                    if (!_this4.selected[i]) {
                        e.classList.remove(_this4.selectedClass);
                    } else {
                        e.classList.add(_this4.selectedClass);
                    }
                }
            });
        }

        /**
         * Renders current selection state
         */

    }, {
        key: 'render',
        value: function render() {
            if (this.dragging) {
                var box = this.getSelectionBox();
                var bb = selectable.absBox(this.boundingBox);
                this.selectBox.style.display = 'block';
                this.selectBox.style.left = box.left - bb.left + this.selectBoxStartX + 'px';
                this.selectBox.style.top = box.top - bb.top + this.selectBoxStartY + 'px';
                this.selectBox.style.width = box.width + 'px';
                this.selectBox.style.height = box.height + 'px';
            } else {
                this.selectBox.style.display = 'none';
            }
            this.renderSelection();
        }
    }], [{
        key: 'absBox',
        value: function absBox(element) {
            var box = element.getBoundingClientRect();

            return { top: box.top + window.scrollY, left: box.left + window.scrollX, width: box.width, height: box.height };
        }
    }]);

    return selectable;
}();

var vSelectable = {
    twoWay: true,

    params: ['selecting', 'items', 'box', 'constraint'],

    bind: function bind() {
        var _this5 = this;

        var selectionBox = document.querySelector(this.params.box || '.selection');
        selectionBox.style.display = 'block';
        this.el.selectable = new selectable(selectionBox, !!this.params.constraint ? document.querySelector(this.params.constraint) : this.el, {
            renderSelected: false,
            renderSelecting: false,
            selectedSetter: function selectedSetter(v) {
                return _this5.vm.$set(_this5.expression, v);
            },
            selectedGetter: function selectedGetter() {
                return _this5.vm.$get(_this5.expression);
            },
            selectingSetter: !!this.params && !!this.params.selecting ? function (v) {
                return _this5.vm.$set(_this5.params.selecting, v);
            } : null
        });
        this.el.selectable.setSelectables(Array.from(this.el.querySelectorAll(this.params.items || '.selectable')));
        selectionBox.style.display = 'none';
    },
    update: function update(newValue, oldValue) {
        // do something based on the updated value
        // this will also be called for the initial value
    },
    unbind: function unbind() {
        this.el.selectable.detach();
        this.el.selectable = null;
    }
};

exports.default = vSelectable;

/***/ })
/******/ ]);
});