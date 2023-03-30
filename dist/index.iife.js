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
    const warn = (msg, vm) => {
        console.error("[Cus warn]: " + msg + (vm || ""));
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

    exports.EMPTY_ARR = EMPTY_ARR;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO = NO;
    exports.NOOP = NOOP;
    exports.camelize = camelize;
    exports.capitalize = capitalize;
    exports.def = def;
    exports.escapeHtml = escapeHtml;
    exports.escapeHtmlComment = escapeHtmlComment;
    exports.extend = extend;
    exports.getGlobalThis = getGlobalThis;
    exports.hasChanged = hasChanged;
    exports.hasOwn = hasOwn;
    exports.hyphenate = hyphenate;
    exports.invokeArrayFns = invokeArrayFns;
    exports.isArray = isArray;
    exports.isDate = isDate;
    exports.isDef = isDef;
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
    exports.looseEqual = looseEqual;
    exports.looseIndexOf = looseIndexOf;
    exports.makeMap = makeMap;
    exports.normalizeClass = normalizeClass;
    exports.normalizeProps = normalizeProps;
    exports.normalizeStyle = normalizeStyle;
    exports.objectToString = objectToString;
    exports.once = once;
    exports.parseStringStyle = parseStringStyle;
    exports.remove = remove;
    exports.stringifyStyle = stringifyStyle;
    exports.toArray = toArray;
    exports.toDisplayString = toDisplayString;
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
