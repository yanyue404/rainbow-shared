/* 空类（默认值） */

// 空对象
export const EMPTY_OBJ = Object.freeze({});

export const EMPTY_ARR = Object.freeze([]);

// 无操作的空函数
export const NOOP = () => {};

/**
 * Always return false.
 */
export const NO = () => false;

/* 类型判断 */

export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown) => objectToString.call(value);

export const toRawType = (value: unknown) => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1);
};
export function isUndef(v: any): v is undefined | null {
  return v === undefined || v === null;
}

export function isDef<T>(v: T): v is NonNullable<T> {
  return v !== undefined && v !== null;
}

/**
 * Check if value is primitive.
 */
export function isPrimitive(value: unknown): boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export const isArray = Array.isArray;

// is 类型保护机制：若返回值为 true，则 val 类型为 Map。这一点放在 if 里边有用
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === "[object Map]";

export const isSet = (val: unknown) => toTypeString(val) === "[object Set]";

export const isDate = (val: unknown) => toTypeString(val) === "[object Date]";

export const isRegExp = (val: unknown) =>
  toTypeString(val) === "[object RegExp]";

export const isFunction = (val: unknown) => typeof val === "function";

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const isSymbol = (val: unknown) => typeof val === "symbol";

export const isObject = (val: unknown): boolean =>
  val !== null && typeof val === "object";

export const isPromise = (val: any): val is Promise<any> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isPlainObject = (val: unknown) =>
  toTypeString(val) === "[object Object]";

/* 字符串方法 */

const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);

export const isModelListener = (key: string) => key.startsWith("onUpdate:");

// 缓存函数
// TODO: 这个泛型有点复杂, 还有一种 https://github.com/vuejs/vue/blob/main/src/shared/util.ts
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
};

const camelizeRE = /-(\w)/g;
/**
 * @连字符转驼峰 ui-tile => uiTile
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

const hyphenateRE = /\B([A-Z])/g;
/**
 * @驼峰转连字符 uiTile => ui-tile
 */
export const hyphenate = cacheStringFunction((str) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);

/**
 * @首字母大写
 */
export const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);

/**
 * @事件方法
 */
export const toHandlerKey = cacheStringFunction((str) =>
  str ? `on${capitalize(str)}` : ``
);

/* 简化方法 */

export function isTrue(v: unknown): boolean {
  return v === true;
}

export function isFalse(v: unknown): boolean {
  return v === false;
}

// 对象合并
export const extend = Object.assign;

// 数组删除某项
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};

// 检测是否属性是否拥有
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol) =>
  hasOwnProperty.call(val, key);

// 全局对象
let _globalThis: any;
export const getGlobalThis = () => {
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
export const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value,
  });
};

// 执行数组里的函数
export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

// compare whether a value has changed, accounting for NaN.
export const hasChanged = (value: any, oldValue: any) =>
  !Object.is(value, oldValue);

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val: any) {
  return val == null
    ? ""
    : Array.isArray(val) ||
      (isPlainObject(val) && val.toString === objectToString)
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

export function toNumber(value: unknown) {
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
export function toArray(list: any[], start?: number): Array<any> {
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
export function toObject(arr: any[]): object {
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
export function once(fn: Function) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      // noImplicitThis , 允许 this 表达式的值为 any类型
      fn.apply(this, arguments);
    }
  };
}

export const warn = (msg: string, vm: any) => {
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
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null);
  const list: Array<string> = str.split(",");
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

export const isHTMLTag = makeMap(HTML_TAGS);

function looseCompareArrays(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}

// 检查两个值是否松散相等 (不需要引用地址相同，属性和值相同即可)
export function looseEqual(a: any, b: any) {
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
export function looseIndexOf(arr: any[], val: any): number {
  return arr.findIndex((item) => looseEqual(item, val));
}

/* 转义 HTML */

const escapeRE = /["'&<>]/;

export function escapeHtml(string: unknown) {
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

export function escapeHtmlComment(src: string): string {
  return src.replace(commentStripRE, "");
}

// toDisplayString 插值表达式转字符串

/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */
export const toDisplayString = (val: any): string => {
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

const replacer = (_key: string, val: any): any => {
  // ref 的包装值在页面展示是这样解开的
  // can't use isRef here since @vue/shared has no deps
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
        (entries as any)[`${key} =>`] = val;
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

export type NormalizedStyle = Record<string, string | number>;

export function normalizeStyle(
  value: any
): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle);
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

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {};
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
export function stringifyStyle(
  styles: Record<string, string | number> | string
): string {
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
export function normalizeClass(value: any): string {
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
export function normalizeProps(props: Record<string, any> | null) {
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
