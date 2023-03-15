'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* 空类（默认值） */

// 空对象
const EMPTY_OBJ = Object.freeze({});

const EMPTY_ARR = Object.freeze([]);

// 无操作的空函数
const NOOP = () => {};

/**
 * Always return false.
 */
const NO = () => false;

/* 类型判断 */

const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);

const toRawType = (value) => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1);
};
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
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

/* 字符串方法 */

const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);

const isModelListener = (key) => key.startsWith("onUpdate:");

// 缓存函数
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

const camelizeRE = /-(\w)/g;
/**
 * @连字符转驼峰 ui-tile => uiTile
 */
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

const hyphenateRE = /\B([A-Z])/g;
/**
 * @驼峰转连字符 uiTile => ui-tile
 */
const hyphenate = cacheStringFunction((str) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);

/**
 * @首字母大写
 */
const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);

/**
 * @事件方法
 */
const toHandlerKey = cacheStringFunction((str) =>
  str ? `on${capitalize(str)}` : ``
);

/* 简化方法 */

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

// 对象合并
const extend = Object.assign;

// 数组删除某项
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};

// 检测是否属性是否拥有
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

// 全局对象
let _globalThis;
const getGlobalThis = () => {
  return (
    _globalThis ||
    (_globalThis =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : {})
  );
};

// 劫持对象属性
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value,
  });
};

// 执行数组里的函数
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}
/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */

function toNumber(value) {
  if (typeof value !== "string") {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
}
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
/**
 * Ensure a function is called only once.
 */
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
/* 很有用的方法 */

// makeMap 创建 map 检查 key 是否存在

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
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

// eg: isHTMLTag('html') => true
const HTML_TAGS =
  "html,body,base,head,link,meta,style,title,address,article,aside,footer," +
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
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}

// 检查两个值是否松散相等 (不需要引用地址相同，属性和值相同即可)
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  // 时间比较时间戳
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  // 唯一的
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  // 数组类型
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  // 对象类型
  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
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
      if (
        (aHasKey && !bHasKey) ||
        (!aHasKey && bHasKey) ||
        !looseEqual(a[key], b[key])
      ) {
        return false;
      }
    }
  }
  // 最后这个宽松，认可 String(1) === String('1')、String(true) === String('true')
  return String(a) === String(b);
}

// 返回 val 在 arr 中的索引
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}

/* 转义 HTML */

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
      case 34: // "
        escaped = "&quot;";
        break;
      case 38: // &
        escaped = "&amp;";
        break;
      case 39: // '
        escaped = "&#39;";
        break;
      case 60: // <
        escaped = "&lt;";
        break;
      case 62: // >
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

// https://www.w3.org/TR/html52/syntax.html#comments
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;

function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}

// toDisplayString 插值表达式转字符串

/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */
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
  // ref 的包装值在页面展示是这样解开的
  // can't use isRef here since @vue/shared has no deps
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
        entries[`${key} =>`] = val;
        return entries;
      }, {}),
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()],
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};

// normalizeProp 转换 props

// 用于将标签的内联 style 里的属性转化为标准的 style 属性。
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
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}

// eg: 转换 style

/* const str = "margin:10px;";
const arr = [
  {
    margin: "10px",
    borderWidth: "10px",
  },
];
const obj = {
  margin: "10px",
  borderWidth: "10px",
};
console.log(normalizeStyle(str)); // margin:10px;
console.log(normalizeStyle(arr)); // { margin: '10px', borderWidth: '10px' }
console.log(normalizeStyle(obj)); // { margin: '10px', borderWidth: '10px' } */

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

// 将对象格式的样式转化为对象格式并且将样式属性转化
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number") {
      // only render valid values
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}

// 用于将标签属性 class 转化为标准的 class
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}

// eg: class 转换

/* const str = "a b c";
const arr = [
  {
    a: true,
    b: false,
    c: true,
  },
];
const obj = {
  a: true,
  b: false,
  c: true,
};
console.log(normalizeClass(str)); // a b c
console.log(normalizeClass(arr)); // a c
console.log(normalizeClass(obj)); // a c */

// 用于 props 上的 class 和 style 属性转化
function normalizeProps(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function () {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
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

exports.EMPTY_ARR = EMPTY_ARR;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.NO = NO;
exports.NOOP = NOOP;
exports.camelize = camelize;
exports.capitalize = capitalize;
exports.debounce = debounce;
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
