var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape(shape) {
        this.color = shape.color;
    }
    Shape.prototype.setColor = function (color) {
        this.color = color;
    };
    return Shape;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(square) {
        var _this = _super.call(this, square) || this;
        _this.type = 'square';
        _this.width = square.width;
        _this.height = square.height;
        _this.area = square.width * square.height;
        return _this;
    }
    return Square;
}(Shape));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'circle';
        return _this;
    }
    return Circle;
}(Shape));
function createShape(ctor, shape) {
    return new ctor(shape);
}
//# sourceMappingURL=test.js.map
"use strict";
/// <reference path="./utils.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./array/index");
exports.array = index_1.default;
var index_2 = require("./date/index");
exports.date = index_2.default;
var index_3 = require("./fn/index");
exports.fn = index_3.default;
var index_4 = require("./math/index");
exports.math = index_4.default;
var index_5 = require("./number/index");
exports.number = index_5.default;
var index_6 = require("./net/index");
exports.net = index_6.default;
var index_7 = require("./object/index");
exports.object = index_7.default;
var index_8 = require("./string/index");
exports.string = index_8.default;
var index_9 = require("./verification/index");
exports.verification = index_9.default;
//# sourceMappingURL=utils.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @obj
 * @desc 操作数组的相关方法。所有函数不会改变实参，会返回操作后的结果。
 * @method compareLength -  比较两个数组的长度
 * @method equal -  比较两个数组的值是否相等
 * @method deleteValue -  从数组里删除第一个相应值，返回新数组
 * @method deleteValueAll -  从数组里删除所有相应值，返回新数组
 * @method deleteSomeExcept -  从数组里删除所有不匹配元素，返回新数组
 * @method map -  封装原生map
 */
var _this = null;
var array = _this = {
    /* 比较相关函数 */
    /**
     * @func
     * @desc 比较两个数组的长度
     * @return 0 - 相等
     * @return >0 - 第一个大于第二个的长度
     * @return <0 - 第一个小于第二个的长度
     */
    compareLength: function (firstArray, secondArray) {
        return firstArray.length - secondArray.length;
    },
    equal: function (firstArray, secondArray) {
        if (_this.compareLength(firstArray, secondArray) !== 0) {
            return false;
        }
        for (var i = 0; i < firstArray.length; i++) {
            var firstValue = firstArray[i];
            var secondValue = secondArray[i];
            if (typeof firstValue !== typeof secondValue) {
                return false;
            }
            else {
                if (firstValue instanceof Array && secondValue instanceof Array) {
                    if (!_this.equal(firstValue, secondValue)) {
                        return false;
                    }
                }
                else if (firstArray[i] !== secondArray[i]) {
                    return false;
                }
            }
        }
        return true;
    },
    /* 删除相关函数 */
    deleteItem: function (array, value) {
        var tempArray = array.slice();
        var index = tempArray.indexOf(value);
        if (index !== -1) {
            tempArray.splice(index, 1);
        }
        return tempArray;
    },
    deleteItems: function (array, value) {
        return array.filter(function (item) { return item !== value; });
    },
    deleteItemsExcept: function (array, exceptArray) {
        return array.filter(function (value) { return exceptArray.includes(value); });
    },
    /* 原生封装 */
    map: function (fn) {
        return function (array) { return array.map(fn); };
    }
};
exports.default = array;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="index.d.ts"/>
var index_1 = require("../string/index");
/**
 * @obj
 * @desc 操作日期的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method createFormatDate - 传入日期格式，返回已毫秒数做参数的日期格式化函数。详情见本函数。
 */
var date = {
    /**
     * @func
     * @desc 格式化日期的函数。
     * @param {string} format - 需要的日期的格式。如:
                             'yy-MM-dd hh:mm:ss ww'(ww为星期,小写w为英文，大写W为中文)
                             'MM dd，yyyy hh:mm:ss'等等
   * @return {function} 返回一个需要传入毫秒数作为参数的函数。
     */
    createFormatDate: function (format) {
        if (format === void 0) { format = 'YYYY/MM/DD hh:mm'; }
        var replaceFormat = index_1.default.replace(/[a-zA-Z]+/g);
        return function (ms) {
            var dateFunctions = {
                'Y': 'getFullYear',
                'M': 'getMonth',
                'D': 'getDate',
                'h': 'getHours',
                'm': 'getMinutes',
                's': 'getSeconds',
                'w': 'getDay',
                'W': 'getDay'
            };
            var weeks = {
                'w': ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
                'W': ['日', '一', '二', '三', '四', '五', '六'].map(function (week) { return "\u661F\u671F" + week; })
            };
            var date = new Date(ms);
            return replaceFormat(format, function (matchStr) {
                var dateFuncName = dateFunctions[matchStr[0]];
                if (dateFuncName) {
                    if (dateFuncName === 'getMonth') {
                        var str = "0000" + (date[dateFuncName]() + 1);
                        return str.substring(str.length - matchStr.length);
                    }
                    else if (dateFuncName === 'getDay') {
                        return weeks[matchStr[0]][date[dateFuncName]()];
                    }
                    else {
                        var str = '0000' + date[dateFuncName]();
                        return str.substring(str.length - matchStr.length);
                    }
                }
                else {
                    return matchStr;
                }
            });
        };
    }
};
exports.default = date;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @obj
 * @desc 操作函数的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method  curry - 将传入的函数柯里化
 * @method  compose - 将所有传入的函数从右向左组合起来
 */
var fn = {
    curry: function (fn) {
        var paramsLength = fn.length;
        function closure(params) {
            var wrapper = function () {
                var newParams = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    newParams[_i] = arguments[_i];
                }
                var allParams = params.concat(newParams);
                if (allParams.length < paramsLength) {
                    return closure(allParams);
                }
                else {
                    return fn.apply(null, allParams);
                }
            };
            return wrapper;
        }
        return closure([]);
    },
    compose: function () {
        var fn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fn[_i] = arguments[_i];
        }
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var i = fn.length - 1;
            var result = fn[i].apply(null, params);
            while (--i >= 0) {
                result = fn[i](result);
            }
            return result;
        };
    }
};
exports.default = fn;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var math = {
    createSin: function (height, width, offset) {
        return function (x) { return height * Math.sin(width * x + offset); };
    },
    createGetPointOnCircle: function (radius, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        return function (radian) { return ({
            x: offsetX + radius * Math.cos(radian),
            y: offsetY + radius * Math.sin(radian),
        }); };
    }
};
exports.default = math;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../string/index");
var index_2 = require("../array/index");
var index_3 = require("../fn/index");
/**
 * @obj
 * @desc  desc
 * @method  parseParams -  解析URL的参数部分的函数
 * @method  parseUrl -  解析URL的函数
 */
var net = {
    parseParams: function (locationSearch) {
        var first = function (arr) { return arr[0]; };
        var last = function (arr) { return arr[arr.length - 1]; };
        var hasQuestionMark = function (locationSearch) { return locationSearch.includes('?') ? locationSearch : "?" + locationSearch; };
        var separateOutParams = index_3.default.compose(last, index_1.default.split('?'), hasQuestionMark);
        var groupingParams = index_3.default.compose(index_2.default.map(index_1.default.split('=')), index_1.default.split('&'));
        var getParams = function (paramsArr) {
            var params = {};
            paramsArr.forEach(function (param) {
                if (first(param)) {
                    params[first(param)] = last(param);
                }
            });
            return params;
        };
        var paramsStr = separateOutParams(locationSearch);
        var paramsArr = groupingParams(paramsStr);
        var params = getParams(paramsArr);
        return params;
    },
    parseUrl: function (url) {
        var HOST_PORT_REGEXP = /^(http:\/\/|https:\/\/)[0-9a-zA-Z.:]+/;
        var HOST_REGEXP = /^(http:\/\/|https:\/\/)[0-9a-zA-Z.]+/;
        /* function */
        var first = function (arr) { return arr[0]; };
        var last = function (arr) { return arr[arr.length - 1]; };
        var checkPort = function (port) { return port ? port : 80; };
        var checkPath = function (path) { return path ? path : '/'; };
        var checkParams = function (url) { return url.includes('?') ? url : ''; };
        var separateOutHref = index_3.default.compose(first, index_1.default.split('?'));
        var separateOutParams = index_3.default.compose(last, index_1.default.split('?'), checkParams);
        var matchHost = index_3.default.compose(first, index_1.default.match(HOST_PORT_REGEXP));
        var groupingParams = index_3.default.compose(index_2.default.map(index_1.default.split('=')), index_1.default.split('&'));
        var getParams = function (paramsArr) {
            var params = {};
            paramsArr.forEach(function (param) {
                if (first(param)) {
                    params[first(param)] = last(param);
                }
            });
            return params;
        };
        var getHost = index_3.default.compose(first, index_1.default.match(HOST_REGEXP));
        var getPort = function (host) { return index_3.default.compose(checkPort, last, index_1.default.split(':'), last, index_1.default.split(host)); };
        /* var */
        var href = separateOutHref(url);
        var paramsStr = separateOutParams(url);
        var hostWithPort = matchHost(href);
        var host = getHost(hostWithPort);
        var port = getPort(host)(hostWithPort);
        var path = index_3.default.compose(checkPath, last, index_1.default.split(hostWithPort))(href);
        var paramsArr = groupingParams(paramsStr);
        var params = getParams(paramsArr);
        var urlMsg = { url: url, host: host, port: port, path: path, params: params };
        return urlMsg;
    }
};
exports.default = net;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @obj
 * @desc  数字的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method  random -  返回一个可以产生符合条件的随机数的函数
 */
var number = {
    createRandomFunction: function (min, max, float) {
        if (min === void 0) { min = 0; }
        return function () {
            var _a;
            if (min > max) {
                _a = [max, min], min = _a[0], max = _a[1];
            }
            if (float || min % 1 || max % 1) {
                return min + Math.random() * (max - min);
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        };
    }
};
exports.default = number;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="index.d.ts"/>
/**
 * @obj
 * @desc 操作对象的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method valueEqual - 判断两个对象的值是否相等
 */
var _this = null;
var object = _this = {
    valueEqual: function (firstObj, secondObj) {
        var firstEntries = Object.entries(firstObj);
        var secondEntries = Object.entries(secondObj);
        if (firstEntries.length !== secondEntries.length) {
            return false;
        }
        for (var _i = 0, firstEntries_1 = firstEntries; _i < firstEntries_1.length; _i++) {
            var key = firstEntries_1[_i][0];
            var firstValue = firstObj[key];
            var secondValue = secondObj[key];
            if (typeof firstValue !== typeof secondValue) {
                return false;
            }
            else if (typeof firstValue === 'object') {
                if (!_this.valueEqual(firstValue, secondValue)) {
                    return false;
                }
            }
            else {
                if (firstValue !== secondValue) {
                    return false;
                }
            }
        }
        return true;
    }
};
exports.default = object;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @obj
 * @desc 操作字符串的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method replace - 传入匹配规则参数，返回一个符合改匹配规则的函数
 * @method split - 返回分割该字符的函数
 * @method match - 返回匹配该正则的函数
 */
var _this = null;
var string = _this = {
    replace: function (match) {
        return function (str, substitute) { return str.replace(match, substitute); };
    },
    split: function (char) {
        return function (str) { return str.split(char); };
    },
    match: function (regexp) {
        return function (str) { return str.match(regexp); };
    }
};
exports.default = string;
//# sourceMappingURL=index.js.map
"use strict";
/// <reference path="index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @obj
 * @desc 验证的相关方法。所有函数不会改变实参的值，会返回操作后的结果。
 * @method  checkRe -  返回验证是否匹配该正则的函数
 * @method  checkLength -  返回验证是否匹配长度的函数
 * @method  check -  返回验证是否匹配该类型的函数
 */
var _this = null;
var verification = _this = {
    _phoneRE: /^(13[0-9]|15[012356789]|18[0-9]|17[678]|14[57])[0-9]{8}$/,
    _emailRE: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    checkRe: function (re) {
        return function (checkedStr) {
            return re.test(checkedStr);
        };
    },
    checkLength: function (min, max) {
        if (min === void 0) { min = 0; }
        return function (str) { return str.length >= min && str.length <= max; };
    },
    check: function (checkType) {
        return _this.checkRe(_this["_" + checkType + "RE"]);
    }
};
exports.default = verification;
//# sourceMappingURL=index.js.map