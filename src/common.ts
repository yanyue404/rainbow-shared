import { isObject, isArray, isFunction, looseEqual } from "./shared";

export function isEmpty(value: any) {
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
/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

export function debounce(func: Function, wait: number): Function {
  let timeout: any,
    args: any,
    context: null,
    timestamp: number,
    result: Function;
  let later = function () {
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

export function throttle(fn: Function, delay: number) {
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
/**
 * promise返回结果包装
 * @param {function} p 返回promise对象的function
 * @returns 一个永远成功返回一个数组的异步方法，数组的第一项存放错误信息，第二项存放结果
 */
export function promiseWrapper(p: any) {
  return (...args: any[]) => {
    return p(...args)
      .then((res: any) => [null, res])
      .catch((err: any) => [err, null]);
  };
}

/**
 * 缓存静态方法的value
 * @param {*} fn  fn 的参数中不能使用 引用类型
 */
export function cacheStaticFn(fn: Function) {
  const cacheMap = new Map();
  return (...args: any[]) => {
    let cacheKey = args.join("-");
    if (!cacheMap.has(cacheKey)) {
      cacheMap.set(cacheKey, fn(...args));
    }
    return cacheMap.get(cacheKey);
  };
}

/* function a() {
    console.log("do a =>");
    return "a";
  }
  function b() {
    console.log("do d =>");
    return "b";
  }
  const cacheA = cacheStaticFn(a);
  const cacheB = cacheStaticFn(b);
  
  cacheA(); // log: do a => 存储:  Map(1) {'' => 'a'} => 已有结果
  cacheA(); // 已有结果
  cacheA(); // 已有结果
  
  cacheB(); // log: do b => 存储:  Map(1) {'' => 'b'} => 已有结果
  cacheB(); // 已有结果
  cacheB(); // 已有结果 */

/**
 * 柯里化函数
 */
export const curry = (fn: Function, ...args: any[]) => {
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  if (fn.length === args.length) {
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    return fn.call(fn, ...args);
  }

  // 传入的参数小于原始函数fn的参数个数时
  // 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数）的函数
  return (...rest: any[]) => curry(fn, ...args, ...rest);
};

export function isUrl(url: string) {
  return /^htt(p|ps):\/\//.test(url);
}

/**
 * getQueryString  从url中拿参数值param
 * @param {str} param 要拿的参数名  字符
 * @param {str} url  要从什么链接上面拿参数  字符  支持密文  可选填
 * @return {str} 参数值
 */
export function getQueryString(param: string, url: string | undefined): string {
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

/**
 * 从页面url中获取json（url是未被编码的明文格式）
 * <pre>url格式：http://www.baidu.com?action=1&toobar=0
 * @param {str} url  页面的url, 选传, 默认当前页面地址（url是未被编码的明文格式）
 * @returns {obj} json    json对象
 */
export function getQueryJson(url: string) {
  var json: Record<string, any> = {};
  var urlStr = isUrl(url) ? url : location.href;
  var splits = urlStr.split("?");
  if (splits && splits.length >= 2) {
    var array = splits[1].split("&");
    if (array && array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        var params = array[i].split("="); // 拆分形式为key=value形式的参数
        json[params[0]] = params[1]; // 第一个参数表示key，第二个参数表示value
      }
    }
  }
  return json;
}

export function addParamsToUrl(
  url = "",
  params: Record<string, any> = {},
  addToHash = false
) {
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
    } else {
      search = str;
    }
  }
  return path + search + hash;
}

export function loadCss(url: string, callback?: Function) {
  return new Promise((resolve: Function) => {
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

export function loadJs(url: string, callback: any, attr: any) {
  if (!isFunction(callback)) {
    attr = callback;
    callback = null;
  }
  return new Promise((resolve: Function, reject) => {
    var script: any = document.createElement("script");
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
    } else {
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

export const deepClone = (o: Record<string, any>, cached: any) => {
  if (o instanceof Object) {
    let cache = new Map();
    let result: Record<string, any>;

    if (o instanceof Function) {
      if (o.prototype) {
        result = function () {
          return o.apply(this, arguments);
        };
      } else {
        result = (...args: any[]) => {
          return o.call(undefined, ...args);
        };
      }
    } else if (o instanceof Array) {
      result = [];
    } else if (o instanceof Date) {
      return +new Date(o);
    } else if (o instanceof RegExp) {
      result = new RegExp(o.source, o.flags);
    } else {
      result = {};
    }
    for (const key in o) {
      if (Object.hasOwnProperty.call(o, key)) {
        if (cached && cached.has(o)) {
          result[key] = cached.get(key);
        } else {
          let val = deepClone(o[key], cache);
          cache.set(key, val);
          result[key] = val;
        }
      }
    }
    return result;
  } else {
    return o;
  }
};
/**
 *
 *
 * @export
 * @param {Object} obj 要检索的对象。
 * @param {Array|string} path 要获取属性的路径。
 * @param {*} defaultValue 如果解析值是 undefined ，这值会被返回
 * @return {*}
 */
export function get(
  obj: Record<string, any>,
  path: string,
  defaultValue?: any
) {
  let chain: string[] = Array.isArray(path) ? path : path.split(/[\.\[\]]+/);
  let val = chain.reduce((prev, curr) => {
    if (prev) {
      return (prev = prev[curr]);
    } else {
      return prev;
    }
  }, obj);
  return val === undefined ? defaultValue : val;
}

/**
 *
 * @export 一个以对象为键的缓存方法，用来返回命中的对象组合结果
 * @param {object} key 对象key
 * @param {any} value
 * @return {any} 命中的缓存对象 {key,value}
 */
const cache = [{ key: {}, value: true }];
export function cacheObj(key: Record<string, any>, value: any) {
  let someIndex = cache.findIndex((v) => looseEqual(v.key, key));
  if (someIndex !== -1) {
    return cache[someIndex];
  } else if (value !== undefined) {
    cache.push({
      key,
      value,
    });
  }
}

/**
 *
 * @export 一个以对象为键的缓存方法，用来返回命中的对象组合结果
 * @param {object} key 年龄关系键值对 {"0-3": '001'}
 * @param {age} [sting]
 * @return {any} 命中的 value 值
 */
export function getObjValByAge(obj: Record<string, any>, age: string) {
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

/**
 * 格式化金额
 * @param {number} number 待格式化金额
 * @param {number} precision 小数位精度
 * @param {string} symbol 钱币标识
 * @returns
 */
 export function formatMoney(number, { precision = 2, symbol = '￥' } = {}) {
  if (number === undefined || number === null || number === '' || isNaN(number))
    return ''
  const negative = number < 0 ? '-' : ''
  let [integer, decimal] = toFixed(Math.abs(number), precision).split('.')
  const mod = integer.length > 3 ? integer.length % 3 : 0

  // fix: 当number 大于1万，且小数点后面全是0，就不展示小数点后的内容了
  if (number > 10000 && /^0+$/g.test(decimal)) {
    decimal = ''
  }
  return (
    symbol +
    negative +
    (mod ? integer.substr(0, mod) + ',' : '') +
    integer.substr(mod).replace(/(\d{3})(?=\d)/g, '$1,') +
    (decimal ? '.' + decimal : '')
  )
}

/**
 * 按指定精度格式化小数
 * @param {number} number 待格式化数字
 * @param {number} precision 精度
 * @returns
 */
export function toFixed(number, precision) {
  const val = Math.round(Math.abs(precision))
  precision = isNaN(val) ? 2 : precision
  const power = Math.pow(10, precision)
  return (Math.round((number + 1e-8) * power) / power).toFixed(precision)
}

/**
 * 加法
 * @param  {...any} n
 */
export function add(...n) {
  return n.reduce((ji, item) => {
    let l1 = (ji.toString().split('.')[1] || '').length
    let l2 = (item.toString().split('.')[1] || '').length
    let l = Math.pow(10, Math.max(l1, l2))
    let r = (ji * l + item * l) / l
    return toFixed(r)
  })
}

/**
 * 乘法
 * @param  {...any} n
 */
export function mul(...n) {
  return n.reduce((ji, item) => {
    let n1 = (ji.toString().split('.')[1] || '').length
    let n2 = (item.toString().split('.')[1] || '').length
    let r =
      (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2)
    return toFixed(r)
  })
}

/**
 * 除法
 * @param  {...any} n
 */
export function div(...n) {
  return n.reduce((ji, item) => {
    let n1 = (ji.toString().split('.')[1] || '').length
    let n2 = (item.toString().split('.')[1] || '').length
    let r =
      (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2)
    return toFixed(r)
  })
}

/**
 * 减法
 * @param  {...any} n
 */
export function sub(...n) {
  return n.reduce((ji, item) => {
    let l1 = (ji.toString().split('.')[1] || '').length
    let l2 = (item.toString().split('.')[1] || '').length
    let n = Math.max(l1, l2)
    let l = Math.pow(10, n)
    let r = (ji * l - item * l) / l
    return toFixed(r)
  })
}
