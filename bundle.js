(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const uniqueRandomArray = require('unique-random-array')
const treeNames = require('./tree-names-de.json')

exports.all = treeNames
exports.random = uniqueRandomArray(treeNames)

if (typeof window !== 'undefined') {
  const Clipboard = require('clipboard')

  window.getTreeName = getTreeName

  function getTreeName (e) {
    var textField = document.getElementsByTagName('input')[0]
    textField.value = uniqueRandomArray(treeNames)()
    if (e) textField.select()
  }

  document.addEventListener('DOMContentLoaded', function () {
    new Clipboard('.btn') // eslint-disable-line
    getTreeName()
  }, false)
}

},{"./tree-names-de.json":12,"clipboard":3,"unique-random-array":10}],2:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'select'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.addEventListener('focus', window.scrollTo(0, yPosition));
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.target) {
                    this.target.blur();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});
},{"select":8}],3:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});
},{"./clipboard-action":2,"good-listener":7,"tiny-emitter":9}],4:[function(require,module,exports){
/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element !== document) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],5:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":4}],6:[function(require,module,exports){
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};

},{}],7:[function(require,module,exports){
var is = require('./is');
var delegate = require('delegate');

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;

},{"./is":6,"delegate":5}],8:[function(require,module,exports){
function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;

},{}],9:[function(require,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],10:[function(require,module,exports){
'use strict';
var uniqueRandom = require('unique-random');

module.exports = function (arr) {
	var rand = uniqueRandom(0, arr.length - 1);

	return function () {
		return arr[rand()];
	};
};

},{"unique-random":11}],11:[function(require,module,exports){
'use strict';
module.exports = function (min, max) {
	var prev;
	return function rand() {
		var num = Math.floor(Math.random() * (max - min + 1) + min);
		return prev = num === prev && min !== max ? rand() : num;
	};
};

},{}],12:[function(require,module,exports){
module.exports=[
  "abendlaendischer-lebensbaum",
  "afrikanischer-butterbaum",
  "afrikanischer-mahagonibaum",
  "afrikanischer-tulpenbaum",
  "afzelia",
  "ahornblaettriger-flaschenbaum",
  "aehrige-felsenbirne",
  "aehrige-scheinhasel",
  "aleppo-kiefer",
  "alexandrinischer-lorbeer",
  "algerische-eiche",
  "alpen-goldregen",
  "amerikanische-buche",
  "amerikanische-eberesche",
  "amerikanische-gleditschie",
  "amerikanische-hainbuche",
  "amerikanische-klettertrompete",
  "amerikanische-linde",
  "amerikanische-reif-weide",
  "amerikanischer-amberbaum",
  "amerikanischer-erdbeerbaum",
  "amerikanischer-schlangenhaut-ahorn",
  "amerikanisches-gelbholz",
  "amur-korkbaum",
  "amur-traubenkirsche",
  "andentanne",
  "aprikose",
  "arganbaum",
  "arizona-zypresse",
  "armbluetige-scheinhasel",
  "atlas-zeder",
  "australische-silbereiche",
  "babylonische-trauer-weide",
  "balearen-johanniskraut",
  "balsam-pappel",
  "balsam-tanne",
  "banks-kiefer",
  "baum-anemone",
  "baum-hasel",
  "baum-heide",
  "beinwellblaettrige-zistrose",
  "berg-ahorn",
  "berg-kiefer",
  "berg-foehre",
  "berg-kirsche",
  "berg-schneegloeckchenbaum",
  "berg-ulme",
  "berg-waldrebe",
  "besen-ginster",
  "bibernell-rose",
  "billards-spierstrauch",
  "birke",
  "birken-pappel",
  "birkenblaettrige-birne",
  "birkenfeige",
  "bitternuss",
  "bitterorange",
  "bittersuesser-nachtschatten",
  "blau-tanne",
  "blaubeere",
  "blaue-atlas-zeder",
  "blaue-passionsblume",
  "blaue-stech-fichte",
  "blauer-holunder",
  "blaugruener-tabak",
  "blut-ahorn",
  "blut-buche",
  "blut-johannisbeere",
  "blut-johanniskraut",
  "blut-pflaume",
  "blueten-hartriegel",
  "blutroter-hartriegel",
  "bodnant-schneeball",
  "bogen-flieder",
  "borsten-fichte",
  "borstige-robinie",
  "borstiger-fluegelstorax",
  "bougainvillea",
  "breitblaettrige-lorbeerrose",
  "breitblaettrige-steinlinde",
  "brennende-waldrebe",
  "brombeere",
  "bruch-weide",
  "buloke",
  "bunges-trompetenbaum",
  "buntblaettrige-buche",
  "bunter-strahlengriffel",
  "burkwoods-duftbluete",
  "busch-eiche",
  "butternuss",
  "carolina-rosskastanie",
  "carolina-schneegloeckchenbaum",
  "cashew",
  "cassia-siberiana",
  "catawba-rhododendron",
  "chenault-schneebeere",
  "chinesische-birne",
  "chinesische-blaugurke",
  "chinesische-blumenesche",
  "chinesische-dattel",
  "chinesische-fluegelnuss",
  "chinesische-hanfpalme",
  "chinesische-kopfeibe",
  "chinesische-pimpernuss",
  "chinesische-spiesstanne",
  "chinesische-ulme",
  "chinesische-winterbluete",
  "chinesische-zierquitte",
  "chinesischer-amberbaum",
  "chinesischer-apfel",
  "chinesischer-blauglockenbaum",
  "chinesischer-blauregen",
  "chinesischer-gewuerzstrauch",
  "chinesischer-judasbaum",
  "chinesischer-klebsame",
  "chinesischer-rosen-eibisch",
  "chinesischer-schneeflockenstrauch",
  "chinesischer-tulpenbaum",
  "chinesisches-rotholz",
  "christdorn",
  "cissusblaettriger-ahorn",
  "colorado-tanne",
  "coulter-kiefer",
  "cunninghams-araukarie",
  "cunninghams-kasuarine",
  "dahurische-radspiere",
  "davids-pfirsisch",
  "davids-schneeball",
  "davids-ahorn",
  "davids-glanzmispel",
  "davids-kiefer",
  "dicksons-ehretia",
  "diels-zwergmispel",
  "distylium-racemosum",
  "doldiger-fluegel-storax",
  "doorenbos-weissrindige-himalaja-birke",
  "dornige-oelweide",
  "douglasie",
  "drachen-weide",
  "drachenbaum",
  "dreh-kiefer",
  "dreibluetiger-ahorn",
  "dreizaehniger-ahorn",
  "drummonds-spitz-ahorn",
  "duftender-schneeball",
  "eberesche",
  "echte-dattelpalme",
  "echte-mehlbeere",
  "echte-pavie",
  "echte-pistazie",
  "echte-quitte",
  "echte-weinrebe",
  "echter-feigenbaum",
  "echter-gewuerzstrauch",
  "echter-hopfen",
  "echtes-geissblatt",
  "edel-tanne",
  "eichblatt-hortensie",
  "eichenblaettrige-hainbuche",
  "einblatt-esche",
  "eingriffeliger-weissdorn",
  "elsbeere",
  "engelmanns-fichte",
  "erlenblaettrige-birke",
  "erlenblaettrige-mehlbeere",
  "erlenblaettrige-zimterle",
  "erlenblaettriger-schneeball",
  "eschen-ahorn",
  "ess-kastanie",
  "essig-baum",
  "etruskisches-geissblatt",
  "europaeische-laerche",
  "europaeische-zwergpalme",
  "faecher-ahorn",
  "faecher-zwergmispel",
  "faerber-eiche",
  "farnblaettrige-buche",
  "feld-ahorn",
  "feld-ulme",
  "felderbach-buche",
  "felsen-ahorn",
  "felsen-gebirgstanne",
  "felsen-kirsche",
  "felsen-kreuzdorn",
  "felsengebirgs-wacholder",
  "fenchelholzbaum",
  "feuer-ahorn",
  "feuerdorn",
  "fiederblatt-weissdorn",
  "filz-rose",
  "filzige-apfelbeere",
  "fingerblaettrige-akebie",
  "fingerstrauch",
  "flammenbaum",
  "flatter-ulme",
  "flaum-eiche",
  "flockige-zwergmispel",
  "florettseidenbaum",
  "fluegel-spindelstrauch",
  "forsythie",
  "frangipani",
  "franzoesische-hybrid-saeckelblume",
  "fruchtbarer-gewuerzstrauch",
  "fruehlings-tamariske",
  "fuji-kirsche",
  "garten-hortensie",
  "gefuellter-gewoehnlicher-schneeball",
  "gefuellter-japanischer-schneeball",
  "gelb-birke",
  "gelb-kiefer",
  "gelbe-rosskastanie",
  "gelbe-trompetenblume",
  "gelber-flammenbaum",
  "gelber-sommerflieder",
  "gelber-trompetenbaum",
  "gelbrinden-akazie",
  "gemeine-buche",
  "gemeine-eibe",
  "gemeine-esche",
  "gemeine-felsenbirne",
  "gemeine-fichte",
  "gemeine-hasel",
  "gemeine-myrte",
  "gemeine-rosskastanie",
  "gemeine-schneebeere",
  "gemeine-trauben-kirsche",
  "gemeiner-bocksdorn",
  "gemeiner-faulbaum",
  "gemeiner-schneeball",
  "gemeiner-wacholder",
  "gemeines-pfaffenhuetchen",
  "gerippte-birke",
  "geschwaenzter-ahorn",
  "geweihbaum",
  "gewoehnliche-berberitze",
  "gewoehnliche-jungfernrebe",
  "gewoehnliche-mahonie",
  "gewoehnliche-platane",
  "gewoehnliche-waldrebe",
  "gewoehnliche-zwergmispel",
  "gewoehnlicher-bastardindigo",
  "gewoehnlicher-blasenstrauch",
  "gewoehnlicher-buchsbaum",
  "gewoehnlicher-efeu",
  "gewoehnlicher-erbsenstrauch",
  "gewoehnlicher-eukalyptus",
  "gewoehnlicher-flieder",
  "gewoehnlicher-goldregen",
  "gewoehnlicher-judasbaum",
  "gewoehnlicher-liguster",
  "gewoehnlicher-perueckenstrauch",
  "gewoehnlicher-seidelbast",
  "gewoehnlicher-sommerflieder",
  "gewuerzstrauch",
  "ghost-tree",
  "ginkgobaum",
  "glaenzender-liguster",
  "glatte-arizona-zypresse",
  "gold-birke-hybride",
  "gold-johannisbeere",
  "gold-ulme",
  "goldlaerche",
  "goetterbaum",
  "granatapfel",
  "grannen-kiefer",
  "grau-erle",
  "grau-pappel",
  "grau-weide",
  "graue-kirschmandel",
  "graue-zistrose",
  "griechische-tanne",
  "grossblaettrige-feige",
  "grossbluetige-abelie",
  "grossbluetige-weissdorn-mispel",
  "grosser-federbuschstrauch",
  "grossfruechtiges-pfaffenhuetchen",
  "grossers-ahorn",
  "gruen-erle",
  "gurken-magnolie",
  "guttaperchabaum",
  "hafer-pflaume",
  "hahnenkamm-sicheltanne",
  "hainbuche",
  "hainbuchenblaettriger-ahorn",
  "haenge-birke",
  "haenge-buche",
  "haenge-fichte",
  "haenge-silber-linde",
  "haengekaetzchen-weide",
  "harlekin-weide",
  "harringtons-kopfeibe",
  "heckrotts-geissblatt",
  "henrys-heckenkirsche",
  "henrys-linde",
  "hiba-lebensbaum",
  "higan-kirsche",
  "himalaja-fleischbeere",
  "himalaja-zeder",
  "himalaja-zeder-'paktia'",
  "himalaya-baummispel",
  "himbeere",
  "himmelsbambus",
  "hoecker-kiefer",
  "hollaendische-linde",
  "holz-apfel",
  "holz-birne",
  "holz-quitte",
  "hong-kong-orchideenbaum",
  "honoki-magnolie",
  "hopfenbuche",
  "hunds-rose",
  "hybrid-klettertrompete",
  "hybrid-laerche",
  "hybrid-zaubernuss",
  "immerbluehende-akazie",
  "immergruene-kriech-heckenkirsche",
  "immergruene-magnolie",
  "immergruener-kreuzdorn",
  "indianerbanane",
  "indische-lagerstroemie",
  "indische-rosskastanie",
  "italienische-erle",
  "italienische-waldrebe",
  "italienische-zypresse",
  "italienischer-ahorn",
  "japanische-aprikose",
  "japanische-bluetenkirsche",
  "japanische-felsenbirne",
  "japanische-goldorange",
  "japanische-hainbuche",
  "japanische-hemlocktanne",
  "japanische-kaiser-eiche",
  "japanische-kamelie",
  "japanische-kastanie",
  "japanische-kornelkirsche",
  "japanische-laerche",
  "japanische-lavendelheide",
  "japanische-mandel-kirsche",
  "japanische-rosskastanie",
  "japanische-skimmie",
  "japanische-stechpalme",
  "japanische-wollmispel",
  "japanische-zelkove",
  "japanische-zierquitte",
  "japanischer-angelikabaum",
  "japanischer-blumen-hartriegel",
  "japanischer-feuer-ahorn",
  "japanischer-liguster",
  "japanischer-papierbusch",
  "japanischer-perlschweif",
  "japanischer-sagopalmfarn",
  "japanischer-schlitzahorn",
  "japanischer-schneeball",
  "japanischer-schnurbaum",
  "japanischer-spierstrauch",
  "japanischer-storaxbaum",
  "jeffrey-kiefer",
  "jerusalemsdorn",
  "johannisbrotbaum",
  "julianes-berberitze",
  "kahle-apfelbeere",
  "kahle-felsenbirne",
  "kahle-glanzmispel",
  "kakipflaume",
  "kalifornische-palme",
  "kampferbaum",
  "kamtschatka-heckenkirsche",
  "kanada-pappel",
  "kanadische-hemlock",
  "kanadischer-judasbaum",
  "kanadischer-schneeball",
  "kanarische-dattelpalme",
  "kanarische-kiefer",
  "kap-bleiwurz",
  "kapernstrauch",
  "karambole",
  "karminroter-zylinderputzer",
  "karroo-akazie",
  "kartoffel-rose",
  "kastanienblaettrige-eiche",
  "kasuarine",
  "katsurabaum",
  "kaukasische-fluegelnuss",
  "kaukasische-linde",
  "kaukasische-mandel",
  "kaukasische-zelkove",
  "kaukasischer-faulbaum",
  "kaukasus-fichte",
  "kermes-eiche",
  "kirschlorbeer",
  "kirschpflaume",
  "kiwi",
  "kleeulme",
  "kleinasiatische-tanne",
  "klettenfruechtige-eiche",
  "kletter-hortensie",
  "kletternder-spindelstrauch",
  "knopfstrauch",
  "kobushi-magnolie",
  "kocks-bauhinie",
  "kokospalme",
  "kolchische-pimpernuss",
  "kolchischer-ahorn",
  "kolkwitzie",
  "koenigsnuss",
  "korb-weide",
  "korea-kiefer",
  "korea-tanne",
  "koreanische-berberitze",
  "koreanischer-schlangenhaut-ahorn",
  "kork-eiche",
  "korkenzieher-hasel",
  "korkenzieher-weide",
  "kornelkirsche",
  "korsische-kiefer",
  "krause-zistrose",
  "kretische-zistrose",
  "kretischer-ahorn",
  "krim-linde",
  "kugelbluetiger-sommerflieder",
  "kultur-birne",
  "kultur-stachelbeere",
  "kulturapfel",
  "kumquat",
  "kupfer-felsenbirne",
  "kuesten-mammutbaum",
  "kuesten-tanne",
  "lacebark-flaschenbaum",
  "lachs-himbeere",
  "lack-zistrose",
  "lamberts-hasel",
  "langblaettrige-deutzie",
  "lawsons-scheinzypresse",
  "lederblatt-ahorn",
  "lederblaettriger-weissdorn",
  "leier-feige",
  "leuchtende-birke",
  "libanon-zeder",
  "libanon-eiche",
  "liebliche-weigelie",
  "lindenblaettrige-birke",
  "lorbeerbaum",
  "lorbeerblaettrige-zistrose",
  "lorbeerblaettriger-schneeball",
  "losbaum",
  "lotuspflaume",
  "maacks-heckenkirsche",
  "macchien-geissblatt",
  "maedchen-kiefer",
  "mahagoni-kirsche",
  "mahonie",
  "mandelbaum",
  "mandelbaeumchen",
  "mandschurische-tanne",
  "mandschurischer-ahorn",
  "manilapalme",
  "manna-esche",
  "mastixstrauch",
  "maulbeer-feige",
  "mesquite",
  "mexikanische-faecherpalme",
  "mexikanische-orangenblume",
  "mirabelle",
  "mispel",
  "mistel",
  "mittelmeer-seidelbast",
  "moenchspfeffer",
  "mongolische-birke",
  "mongolische-linde",
  "montpelier-zistrose",
  "moor-birke",
  "morgenlaendische-platane",
  "morgenlaendischer-lebensbaum",
  "myoporum-serratum",
  "myrtenblaettrige-kreuzblume",
  "nashi-birne",
  "nikko-tanne",
  "nootka-scheinzypresse",
  "nordmanns-tanne",
  "norfolk-hibiskus",
  "norfolktanne",
  "nutalls-blumen-hartriegel",
  "obassia-storaxbaum",
  "ohio-rosskastanie",
  "ohr-weide",
  "oelbaum",
  "oleander",
  "oelweide-hybride",
  "orange",
  "oregon-ahorn",
  "oregon-esche",
  "orient-buche",
  "orientalischer-amberbaum",
  "osagedorn",
  "oster-schneeball",
  "palisanderholzbaum",
  "panzer-kiefer",
  "papier-birke",
  "papiermaulbeerbaum",
  "pappelblaettrige-birke-hybride",
  "pappelblaettrige-zistrose",
  "pappelblaettriger-flaschenbaum",
  "paradiesvogelbusch",
  "paternosterbaum",
  "pekannuss",
  "persische-eiche",
  "persischer-eisenholzbaum",
  "petterie",
  "pfefferbaum",
  "pfeifenstrauch",
  "pfeifenstrauch",
  "pfirsich",
  "pflaume",
  "pflaumenblaettrige-apfelbeere",
  "pfriemenginster",
  "pimpernuss",
  "pinie",
  "platanenblaettrige-alangie",
  "platanenblaettriger-maulbeerbaum",
  "pontische-eiche",
  "portugiesische-eiche",
  "portugiesische-lorbeerkirsche",
  "pracht-spierstrauch",
  "praechtige-lagerstroemie",
  "praechtiger-trompetenbaum",
  "preisselbeere",
  "prunus-'accolade'",
  "prunus-'kursar'",
  "prunus-avium-'plena'",
  "prunus-cerasifera-'rosea'",
  "prunus-cerasus-'rhexii'",
  "purgier-kreuzdorn",
  "purpur-apfel",
  "purpur-magnolie",
  "purpur-schoenfrucht",
  "purpur-weide",
  "purpurblaettriger-trompetenbaum",
  "purpus-heckenkirsche",
  "pyramiden-pappel",
  "pyrenaeen-eiche",
  "pyrenaeen-kiefer",
  "queensland-strahlenaralie",
  "queensland-araukarie",
  "queensland-flaschenbaum",
  "rain-tree",
  "ranunkelstrauch",
  "raublaettrige-deutzie",
  "rauchzypresse",
  "rauchzypresse",
  "raue-stechwinde",
  "rauhe-hortensie",
  "rauschbeere",
  "rautenblaettrige-stechpalme",
  "reneklode",
  "riesen-hartriegel",
  "riesen-lebensbaum",
  "riesen-mammutbaum",
  "rispen-hartriegel",
  "rispen-hortensie",
  "rispiger-blasenbaum",
  "robinia-x-margaretta",
  "robinie",
  "rosa-klettertrompete",
  "rosen-deutzie",
  "rosen-kaktus",
  "rosmarinheide",
  "rosskastanien-hybrid",
  "rostnerviger-schlangenhaut-ahorn",
  "rostrote-weinrebe",
  "rot-ahorn",
  "rot-eiche",
  "rotbeeriger-wacholder",
  "rotblaettriger-berg-ahorn",
  "rotbluehende-rosskastanie",
  "rotdorn",
  "rote-heckenkirsche",
  "rote-johannisbeere",
  "rumelische-kiefer",
  "runzelblaettriger-schneeball",
  "sadebaum",
  "saft-weissdorn",
  "sal-weide",
  "salbeiblaettrige-zistrose",
  "salzstrauch",
  "samthaarige-stinkesche",
  "sandbuechsenbaum",
  "sanddorn",
  "sargents-apfel",
  "sargents-samt-hortensie",
  "sauerbaum",
  "sauerkirsche",
  "saeulen-araukarie",
  "saeulen-stiel-eiche",
  "sawara-scheinzypresse",
  "scharlach-eiche",
  "scharlach-weissdorn",
  "schaumspiere",
  "scheinkamelie",
  "scheinkerrie",
  "scheinparrotie",
  "schindel-eiche",
  "schirm-magnolie",
  "schirm-oelweide",
  "schirmtanne",
  "schlangenhaut-kiefer",
  "schlehe",
  "schlitzblaettrige-haenge-birke",
  "schmalblaettrige-esche",
  "schmalblaettrige-oelweide",
  "schmalblaettrige-steinlinde",
  "schmalblaettriger-lavendel",
  "schmalblaettriger-sommerflieder",
  "schmalblaettriger-trompetenbaum",
  "schneeballblaettrige-blasenspiere",
  "schneeballblaettriger-ahorn",
  "schoene-lycesterie",
  "schopf-lavendel",
  "schuppenrinden-hickorynuss",
  "schwarz-birke",
  "schwarz-eiche",
  "schwarz-erle",
  "schwarz-fichte",
  "schwarz-kiefer",
  "schwarz-pappel",
  "schwarze-heckenkirsche",
  "schwarzer-holunder",
  "schwarzer-maulbeerbaum",
  "schwarzfruechtiger-weissdorn",
  "schwarznuss",
  "schwedische-mehlbeere",
  "seemandel",
  "seetraube",
  "seidenbaum",
  "seidenraupen-eiche",
  "seidiger-hartriegel",
  "serbische-fichte",
  "shumard-eiche",
  "sibirische-aprikose",
  "sibirische-fiederspiere",
  "sibirische-ulme",
  "sicheltanne",
  "sieben-soehne-des-himmels-strauch",
  "siebolds-fingeraralie",
  "silber-ahorn",
  "silber-akazie",
  "silber-bueffelbeere",
  "silber-linde",
  "silber-pappel",
  "silber-weide",
  "silberginster",
  "siskiyou-fichte",
  "sitka-erle",
  "sitka-fichte",
  "sommer-linde",
  "sommer-magnolie",
  "sonnenschirmbaum",
  "spanische-eiche",
  "spanische-tanne",
  "spaete-traubenkirsche",
  "spaetsommer-duftbluete",
  "speierling",
  "spitz-ahorn",
  "spottnuss-hickory",
  "stacheliger-dornginster",
  "stacheliger-maeusedorn",
  "stechender-spargel",
  "stechginster",
  "stechpalme",
  "stein-eiche",
  "sternmagnolie",
  "stiel-eiche",
  "stiel-eiche",
  "stinkstrauch",
  "strand-kiefer",
  "strauch-eibisch",
  "strauch-paeonie",
  "strauch-rosskastanie",
  "suedbuche",
  "suedlicher-zuergelbaum",
  "sumpf-eiche",
  "sumpf-porst",
  "sumpfzypresse",
  "suentel-buche",
  "surenbaum",
  "taiwanie",
  "taschentuchbaum",
  "tataren-ahorn",
  "tataren-heckenkirsche",
  "tatarischer-hartriegel",
  "taeuschendes-gelbholz",
  "tempel-kiefer",
  "terpentin-pistazie",
  "thunbergs-berberitze",
  "thunbergs-kiefer",
  "thunbergs-spierstrauch",
  "tigerschwanz-fichte",
  "tipubaum",
  "traenen-kiefer",
  "trauben-eiche",
  "trauben-eiche",
  "trauben-holunder",
  "trauer-weide",
  "trompetenbaum",
  "tropischer-oleander",
  "tulpen-magnolie",
  "tulpenbaum",
  "ulme-'jacqueline-hillier'",
  "ungarische-eiche",
  "ueppige-robinie",
  "ussuri-spindelstrauch",
  "veitchs-scheinhasel",
  "veitchs-tanne",
  "vielbluetige-lavendelheide",
  "vielbluetige-zwergmispel",
  "vielbluetiger-apfel",
  "vielbluetiges-doppelschild",
  "virginische-hopfenbuche",
  "virginische-zaubernuss",
  "virginischer-schneeflockenstrauch",
  "vogel-kirsche",
  "wald-geissblatt",
  "wald-hortensie",
  "wald-kiefer",
  "wald-tupelobaum",
  "walnuss",
  "wandelroeschen",
  "weiden-eiche",
  "weidenblaettrige-birne",
  "weihnachtsbaum",
  "weinblatt-ahorn",
  "weiss-eiche",
  "weiss-fichte",
  "weiss-tanne",
  "weisser-maulbeerbaum",
  "weissliche-zistrose",
  "westamerikanische-weymouths-kiefer",
  "westliche-hemlockstanne",
  "westlicher-erdbeerbaum",
  "westlicher-zuergelbaum",
  "weymouths-kiefer",
  "wiesners-magnolie",
  "wilder-wein",
  "wilder-wein",
  "wilsons-fichte",
  "winter-jasmin",
  "winter-kirsche",
  "winter-linde",
  "wintergruene-eiche",
  "wintergruener-liguster",
  "wohlriechende-himbeere",
  "wollemie",
  "wolliger-schneeball",
  "wunderbaum",
  "yulan-magnolie",
  "zapfennuss",
  "zerr-eiche",
  "zimmeraralie",
  "zimt-ahorn",
  "zirbel-kiefer",
  "zitrone",
  "zitter-pappel",
  "zoescheners-ahorn",
  "zucker-ahorn",
  "zucker-birke",
  "zuckerhut-fichte",
  "zweigriffeliger-weissdorn",
  "zweihaeusige-kermesbeere",
  "zwetschge",
  "zypern-zeder"
]

},{}]},{},[1]);
