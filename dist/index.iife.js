/* rainbow-shared version " + 0.5.4 + " */
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var R = (function (exports) {
    'use strict';

    var ENVIRONMENT = "production";

    const EMPTY_OBJ = Object.freeze({});
    const EMPTY_ARR = Object.freeze([]);
    const NOOP = () => { };
    const NO = () => false;
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
        return toTypeString(value).slice(8, -1);
    };
    function isUndef(v) {
        return v === undefined || v === null;
    }
    function isDef(v) {
        return v !== undefined && v !== null;
    }
    function isPrimitive(value) {
        return (typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "symbol" ||
            typeof value === "boolean");
    }
    const isArray = Array.isArray;
    const isMap = (val) => toTypeString(val) === "[object Map]";
    const isSet = (val) => toTypeString(val) === "[object Set]";
    const isDate = (val) => toTypeString(val) === "[object Date]";
    const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
    const isFunction = (val) => typeof val === "function";
    const isString = (val) => typeof val === "string";
    const isSymbol = (val) => typeof val === "symbol";
    const isObject = (val) => val !== null && typeof val === "object";
    const isPromise = (val) => {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
    const isPlainObject = (val) => toTypeString(val) === "[object Object]";
    const onRE = /^on[^a-z]/;
    const isOn = (key) => onRE.test(key);
    const isModelListener = (key) => key.startsWith("onUpdate:");
    const cacheStringFunction = (fn) => {
        const cache = Object.create(null);
        return ((str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        });
    };
    const camelizeRE = /-(\w)/g;
    const camelize = cacheStringFunction((str) => {
        return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
    });
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    function isTrue(v) {
        return v === true;
    }
    function isFalse(v) {
        return v === false;
    }
    const extend = Object.assign;
    const remove = (arr, el) => {
        const i = arr.indexOf(el);
        if (i > -1) {
            arr.splice(i, 1);
        }
    };
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty.call(val, key);
    let _globalThis;
    const getGlobalThis = () => {
        return (_globalThis ||
            (_globalThis =
                typeof globalThis !== "undefined"
                    ? globalThis
                    : typeof self !== "undefined"
                        ? self
                        : typeof window !== "undefined"
                            ? window
                            : typeof global !== "undefined"
                                ? global
                                : {}));
    };
    const def = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: false,
            value,
        });
    };
    const invokeArrayFns = (fns, arg) => {
        for (let i = 0; i < fns.length; i++) {
            fns[i](arg);
        }
    };
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    function toString(val) {
        return val == null
            ? ""
            : Array.isArray(val) ||
                (isPlainObject(val) && val.toString === objectToString)
                ? JSON.stringify(val, null, 2)
                : String(val);
    }
    function toNumber(value) {
        if (typeof value !== "string") {
            return value;
        }
        else {
            var parsed = Number(value);
            return isNaN(parsed) ? value : parsed;
        }
    }
    function toArray(list, start) {
        start = start || 0;
        let i = list.length - start;
        const ret = new Array(i);
        while (i--) {
            ret[i] = list[i + start];
        }
        return ret;
    }
    function toObject(arr) {
        const res = {};
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                extend(res, arr[i]);
            }
        }
        return res;
    }
    function once(fn) {
        let called = false;
        return function () {
            if (!called) {
                called = true;
                fn.apply(this, arguments);
            }
        };
    }
    const warn = (msg, ...args) => {
        console.warn("[Cus warn]: " + msg, ...args);
    };
    function makeMap(str, expectsLowerCase) {
        const map = Object.create(null);
        const list = str.split(",");
        for (let i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase
            ? (val) => !!map[val.toLowerCase()]
            : (val) => !!map[val];
    }
    const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer," +
        "header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption," +
        "figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code," +
        "data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup," +
        "time,u,var,wbr,area,audio,map,track,video,embed,object,param,source," +
        "canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td," +
        "th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup," +
        "option,output,progress,select,textarea,details,dialog,menu," +
        "summary,template,blockquote,iframe,tfoot";
    const isHTMLTag = makeMap(HTML_TAGS);
    function looseCompareArrays(a, b) {
        if (a.length !== b.length)
            return false;
        let equal = true;
        for (let i = 0; equal && i < a.length; i++) {
            equal = looseEqual(a[i], b[i]);
        }
        return equal;
    }
    function looseEqual(a, b) {
        if (a === b)
            return true;
        let aValidType = isDate(a);
        let bValidType = isDate(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? a.getTime() === b.getTime() : false;
        }
        aValidType = isSymbol(a);
        bValidType = isSymbol(b);
        if (aValidType || bValidType) {
            return a === b;
        }
        aValidType = isArray(a);
        bValidType = isArray(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? looseCompareArrays(a, b) : false;
        }
        aValidType = isObject(a);
        bValidType = isObject(b);
        if (aValidType || bValidType) {
            if (!aValidType || !bValidType) {
                return false;
            }
            const aKeysCount = Object.keys(a).length;
            const bKeysCount = Object.keys(b).length;
            if (aKeysCount !== bKeysCount) {
                return false;
            }
            for (const key in a) {
                const aHasKey = a.hasOwnProperty(key);
                const bHasKey = b.hasOwnProperty(key);
                if ((aHasKey && !bHasKey) ||
                    (!aHasKey && bHasKey) ||
                    !looseEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
        return arr.findIndex((item) => looseEqual(item, val));
    }
    const escapeRE = /["'&<>]/;
    function escapeHtml(string) {
        const str = "" + string;
        const match = escapeRE.exec(str);
        if (!match) {
            return str;
        }
        let html = "";
        let escaped;
        let index;
        let lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
                case 34:
                    escaped = "&quot;";
                    break;
                case 38:
                    escaped = "&amp;";
                    break;
                case 39:
                    escaped = "&#39;";
                    break;
                case 60:
                    escaped = "&lt;";
                    break;
                case 62:
                    escaped = "&gt;";
                    break;
                default:
                    continue;
            }
            if (lastIndex !== index) {
                html += str.slice(lastIndex, index);
            }
            lastIndex = index + 1;
            html += escaped;
        }
        return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
    }
    const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
        return src.replace(commentStripRE, "");
    }
    const toDisplayString = (val) => {
        return isString(val)
            ? val
            : val == null
                ? ""
                : isArray(val) ||
                    (isObject(val) &&
                        (val.toString === objectToString || !isFunction(val.toString)))
                    ? JSON.stringify(val, replacer, 2)
                    : String(val);
    };
    const replacer = (_key, val) => {
        if (val && val.__v_isRef) {
            return replacer(_key, val.value);
        }
        else if (isMap(val)) {
            return {
                [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
                    entries[`${key} =>`] = val;
                    return entries;
                }, {}),
            };
        }
        else if (isSet(val)) {
            return {
                [`Set(${val.size})`]: [...val.values()],
            };
        }
        else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
            return String(val);
        }
        return val;
    };
    function normalizeStyle(value) {
        if (isArray(value)) {
            const res = {};
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                const normalized = isString(item)
                    ? parseStringStyle(item)
                    : normalizeStyle(item);
                if (normalized) {
                    for (const key in normalized) {
                        res[key] = normalized[key];
                    }
                }
            }
            return res;
        }
        else if (isString(value)) {
            return value;
        }
        else if (isObject(value)) {
            return value;
        }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:([^]+)/;
    const styleCommentRE = /\/\*.*?\*\//gs;
    function parseStringStyle(cssText) {
        const ret = {};
        cssText
            .replace(styleCommentRE, "")
            .split(listDelimiterRE)
            .forEach((item) => {
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }
    function stringifyStyle(styles) {
        let ret = "";
        if (!styles || isString(styles)) {
            return ret;
        }
        for (const key in styles) {
            const value = styles[key];
            const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
            if (isString(value) || typeof value === "number") {
                ret += `${normalizedKey}:${value};`;
            }
        }
        return ret;
    }
    function normalizeClass(value) {
        let res = "";
        if (isString(value)) {
            res = value;
        }
        else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const normalized = normalizeClass(value[i]);
                if (normalized) {
                    res += normalized + " ";
                }
            }
        }
        else if (isObject(value)) {
            for (const name in value) {
                if (value[name]) {
                    res += name + " ";
                }
            }
        }
        return res.trim();
    }
    function normalizeProps(props) {
        if (!props)
            return null;
        let { class: klass, style } = props;
        if (klass && !isString(klass)) {
            props.class = normalizeClass(klass);
        }
        if (style) {
            props.style = normalizeStyle(style);
        }
        return props;
    }

    function isEmpty(value) {
        if (isObject(value)) {
            if (value == null) {
                return true;
            }
            if (isArray(value)) {
                return !value.length;
            }
            return Object.keys(value).length === 0;
        }
        return false;
    }
    function debounce(func, wait) {
        let timeout, args, context, timestamp, result;
        let later = function () {
            var last = Date.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            return result;
        };
    }
    function throttle(fn, delay) {
        let curTime = Date.now();
        return function () {
            const context = this;
            const args = arguments;
            const nowTime = Date.now();
            if (nowTime - curTime >= delay) {
                curTime = Date.now();
                return fn.apply(context, args);
            }
        };
    }
    function promiseWrapper(p) {
        return (...args) => {
            return p(...args)
                .then((res) => [null, res])
                .catch((err) => [err, null]);
        };
    }
    function cacheStaticFn(fn) {
        const cacheMap = new Map();
        return (...args) => {
            let cacheKey = args.join("-");
            if (!cacheMap.has(cacheKey)) {
                cacheMap.set(cacheKey, fn(...args));
            }
            return cacheMap.get(cacheKey);
        };
    }
    const curry = (fn, ...args) => {
        if (fn.length === args.length) {
            return fn.call(fn, ...args);
        }
        return (...rest) => curry(fn, ...args, ...rest);
    };
    function isUrl(url) {
        return /^htt(p|ps):\/\//.test(url);
    }
    function getQueryString(param, url) {
        var searchUrl = window.location.href;
        if (url) {
            searchUrl = url.indexOf("?") ? url.substr(url.indexOf("?")) : searchUrl;
        }
        var reg = new RegExp("(^|&|\\?)" + param + "=([^&]+)(&|$)", "i");
        var r = searchUrl.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]) || "";
        }
        return "";
    }
    function getQueryJson(url) {
        var json = {};
        var urlStr = isUrl(url) ? url : location.href;
        var splits = urlStr.split("?");
        if (splits && splits.length >= 2) {
            var array = splits[1].split("&");
            if (array && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var params = array[i].split("=");
                    json[params[0]] = params[1];
                }
            }
        }
        return json;
    }
    function addParamsToUrl(url = "", params = {}, addToHash = false) {
        let hashpos = url.indexOf("#");
        let hash = "";
        let path = url;
        let search = "";
        if (hashpos >= 0) {
            hash = url.slice(hashpos);
            path = url.slice(0, hashpos);
        }
        let str = addToHash ? hash : path;
        let cururlparams = (str && getQueryJson(str)) || {};
        params = {
            ...cururlparams,
            ...params,
        };
        let serachPos = path.indexOf("?");
        if (serachPos >= 0) {
            search = path.slice(serachPos);
            path = path.slice(0, serachPos);
        }
        addToHash ? (hash = hash.split("?")[0]) : (search = "");
        str = "";
        Object.keys(params).forEach((key) => {
            if (params[key]) {
                str += "&" + key + "=" + params[key];
            }
        });
        if (str) {
            str = "?" + str.slice(1);
            if (addToHash) {
                hash = hash + str;
            }
            else {
                search = str;
            }
        }
        return path + search + hash;
    }
    function loadCss(url, callback) {
        return new Promise((resolve) => {
            var node = document.createElement("link");
            node.type = "text/css";
            node.rel = "stylesheet";
            node.href = url;
            node.onerror = node.onload = function () {
                resolve();
                isFunction(callback) && callback();
            };
            document.head.appendChild(node);
        });
    }
    function loadJs(url, callback, attr) {
        if (!isFunction(callback)) {
            attr = callback;
            callback = null;
        }
        return new Promise((resolve, reject) => {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (isObject(attr)) {
                Object.keys(attr).forEach((key) => {
                    if (attr.hasOwnProperty(key)) {
                        script.setAttribute(key, attr[key]);
                    }
                });
            }
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        isFunction(callback) && callback();
                        resolve();
                    }
                };
            }
            else {
                script.onload = function () {
                    isFunction(callback) && callback();
                    resolve();
                };
            }
            script.onerror = function () {
                reject();
            };
            script.src = url;
            document.head.appendChild(script);
        });
    }
    const deepClone = (o, cached) => {
        if (o instanceof Object) {
            let cache = new Map();
            let result;
            if (o instanceof Function) {
                if (o.prototype) {
                    result = function () {
                        return o.apply(this, arguments);
                    };
                }
                else {
                    result = (...args) => {
                        return o.call(undefined, ...args);
                    };
                }
            }
            else if (o instanceof Array) {
                result = [];
            }
            else if (o instanceof Date) {
                return +new Date(o);
            }
            else if (o instanceof RegExp) {
                result = new RegExp(o.source, o.flags);
            }
            else {
                result = {};
            }
            for (const key in o) {
                if (Object.hasOwnProperty.call(o, key)) {
                    if (cached && cached.has(o)) {
                        result[key] = cached.get(key);
                    }
                    else {
                        let val = deepClone(o[key], cache);
                        cache.set(key, val);
                        result[key] = val;
                    }
                }
            }
            return result;
        }
        else {
            return o;
        }
    };
    function get(obj, path, defaultValue) {
        let chain = Array.isArray(path) ? path : path.split(/[\.\[\]]+/);
        let val = chain.reduce((prev, curr) => {
            if (prev) {
                return (prev = prev[curr]);
            }
            else {
                return prev;
            }
        }, obj);
        return val === undefined ? defaultValue : val;
    }
    const cache = [{ key: {}, value: true }];
    function cacheObj(key, value) {
        let someIndex = cache.findIndex((v) => looseEqual(v.key, key));
        if (someIndex !== -1) {
            return cache[someIndex];
        }
        else if (value !== undefined) {
            cache.push({
                key,
                value,
            });
        }
    }
    function getObjValByAge(obj, age) {
        const keys = Object.keys(obj);
        let result = "";
        keys.forEach((item) => {
            let [age1, age2] = item.split("-");
            if (age2 === undefined) {
                throw new Error("[Error]: 键的表示方式必须为 A-B 形式");
            }
            if (Number(age1) <= Number(age) && Number(age2) >= Number(age)) {
                result = obj[item];
            }
        });
        return result;
    }
    function formatMoney(number, { precision = 2, symbol = "￥" } = {}) {
        if (number === undefined || number === null || number === "" || isNaN(number))
            return "";
        const negative = number < 0 ? "-" : "";
        let [integer, decimal] = toFixed(Math.abs(number), precision).split(".");
        const mod = integer.length > 3 ? integer.length % 3 : 0;
        if (number > 10000 && /^0+$/g.test(decimal)) {
            decimal = "";
        }
        return (symbol +
            negative +
            (mod ? integer.substr(0, mod) + "," : "") +
            integer.substr(mod).replace(/(\d{3})(?=\d)/g, "$1,") +
            (decimal ? "." + decimal : ""));
    }
    function toFixed(number, precision = 2) {
        const val = Math.round(Math.abs(precision));
        precision = isNaN(val) ? 2 : precision;
        const power = Math.pow(10, precision);
        return (Math.round((number + 1e-8) * power) / power).toFixed(precision);
    }
    function add(...n) {
        return n.reduce((ji, item) => {
            let l1 = (ji.toString().split(".")[1] || "").length;
            let l2 = (item.toString().split(".")[1] || "").length;
            let l = Math.pow(10, Math.max(l1, l2));
            let r = (ji * l + item * l) / l;
            return toFixed(r);
        });
    }
    function mul(...n) {
        return n.reduce((ji, item) => {
            let n1 = (ji.toString().split(".")[1] || "").length;
            let n2 = (item.toString().split(".")[1] || "").length;
            let r = (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2);
            return toFixed(r);
        });
    }
    function div(...n) {
        return n.reduce((ji, item) => {
            let n1 = (ji.toString().split(".")[1] || "").length;
            let n2 = (item.toString().split(".")[1] || "").length;
            let r = (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2);
            return toFixed(r);
        });
    }
    function sub(...n) {
        return n.reduce((ji, item) => {
            let l1 = (ji.toString().split(".")[1] || "").length;
            let l2 = (item.toString().split(".")[1] || "").length;
            let n = Math.max(l1, l2);
            let l = Math.pow(10, n);
            let r = (ji * l - item * l) / l;
            return toFixed(r);
        });
    }

    exports.EMPTY_ARR = EMPTY_ARR;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO = NO;
    exports.NOOP = NOOP;
    exports.add = add;
    exports.addParamsToUrl = addParamsToUrl;
    exports.cacheObj = cacheObj;
    exports.cacheStaticFn = cacheStaticFn;
    exports.camelize = camelize;
    exports.capitalize = capitalize;
    exports.curry = curry;
    exports.debounce = debounce;
    exports.deepClone = deepClone;
    exports.def = def;
    exports.div = div;
    exports.escapeHtml = escapeHtml;
    exports.escapeHtmlComment = escapeHtmlComment;
    exports.extend = extend;
    exports.formatMoney = formatMoney;
    exports.get = get;
    exports.getGlobalThis = getGlobalThis;
    exports.getObjValByAge = getObjValByAge;
    exports.getQueryJson = getQueryJson;
    exports.getQueryString = getQueryString;
    exports.hasChanged = hasChanged;
    exports.hasOwn = hasOwn;
    exports.hyphenate = hyphenate;
    exports.invokeArrayFns = invokeArrayFns;
    exports.isArray = isArray;
    exports.isDate = isDate;
    exports.isDef = isDef;
    exports.isEmpty = isEmpty;
    exports.isFalse = isFalse;
    exports.isFunction = isFunction;
    exports.isHTMLTag = isHTMLTag;
    exports.isMap = isMap;
    exports.isModelListener = isModelListener;
    exports.isObject = isObject;
    exports.isOn = isOn;
    exports.isPlainObject = isPlainObject;
    exports.isPrimitive = isPrimitive;
    exports.isPromise = isPromise;
    exports.isRegExp = isRegExp;
    exports.isSet = isSet;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isTrue = isTrue;
    exports.isUndef = isUndef;
    exports.isUrl = isUrl;
    exports.loadCss = loadCss;
    exports.loadJs = loadJs;
    exports.looseEqual = looseEqual;
    exports.looseIndexOf = looseIndexOf;
    exports.makeMap = makeMap;
    exports.mul = mul;
    exports.normalizeClass = normalizeClass;
    exports.normalizeProps = normalizeProps;
    exports.normalizeStyle = normalizeStyle;
    exports.objectToString = objectToString;
    exports.once = once;
    exports.parseStringStyle = parseStringStyle;
    exports.promiseWrapper = promiseWrapper;
    exports.remove = remove;
    exports.stringifyStyle = stringifyStyle;
    exports.sub = sub;
    exports.throttle = throttle;
    exports.toArray = toArray;
    exports.toDisplayString = toDisplayString;
    exports.toFixed = toFixed;
    exports.toHandlerKey = toHandlerKey;
    exports.toNumber = toNumber;
    exports.toObject = toObject;
    exports.toRawType = toRawType;
    exports.toString = toString;
    exports.toTypeString = toTypeString;
    exports.warn = warn;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=index.iife.js.map
