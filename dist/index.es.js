const t = Object.freeze({}),
  e = Object.freeze([]),
  n = () => {},
  r = () => !1,
  o = Object.prototype.toString,
  i = (t) => o.call(t),
  c = (t) => i(t).slice(8, -1);
function l(t) {
  return null == t;
}
function s(t) {
  return null != t;
}
function a(t) {
  return (
    "string" == typeof t ||
    "number" == typeof t ||
    "symbol" == typeof t ||
    "boolean" == typeof t
  );
}
const u = Array.isArray,
  f = (t) => "[object Map]" === i(t),
  p = (t) => "[object Set]" === i(t),
  d = (t) => "[object Date]" === i(t),
  h = (t) => "[object RegExp]" === i(t),
  b = (t) => "function" == typeof t,
  y = (t) => "string" == typeof t,
  g = (t) => "symbol" == typeof t,
  m = (t) => null !== t && "object" == typeof t,
  O = (t) => m(t) && b(t.then) && b(t.catch),
  j = (t) => "[object Object]" === i(t),
  v = /^on[^a-z]/,
  w = (t) => v.test(t),
  k = (t) => t.startsWith("onUpdate:"),
  x = (t) => {
    const e = Object.create(null);
    return (n) => e[n] || (e[n] = t(n));
  },
  A = /-(\w)/g,
  E = x((t) => t.replace(A, (t, e) => (e ? e.toUpperCase() : ""))),
  S = /\B([A-Z])/g,
  C = x((t) => t.replace(S, "-$1").toLowerCase()),
  N = x((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  D = x((t) => (t ? "on" + N(t) : ""));
function P(t) {
  return !0 === t;
}
function $(t) {
  return !1 === t;
}
const F = Object.assign,
  R = (t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  },
  T = Object.prototype.hasOwnProperty,
  q = (t, e) => T.call(t, e);
let z;
const M = () =>
    z ||
    (z =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : {}),
  U = (t, e, n) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: n });
  },
  _ = (t, e) => {
    for (let n = 0; t.length > n; n++) t[n](e);
  },
  I = (t, e) => !Object.is(t, e);
function B(t) {
  return null == t
    ? ""
    : Array.isArray(t) || (j(t) && t.toString === _toString)
    ? JSON.stringify(t, null, 2)
    : t + "";
}
function J(t) {
  if ("string" != typeof t) return t;
  var e = Number(t);
  return isNaN(e) ? t : e;
}
function L(t, e) {
  let n = t.length - (e = e || 0);
  const r = Array(n);
  for (; n--; ) r[n] = t[n + e];
  return r;
}
function W(t) {
  const e = {};
  for (let n = 0; t.length > n; n++) t[n] && F(e, t[n]);
  return e;
}
function Z(t) {
  let e = !1;
  return function () {
    e || ((e = !0), t.apply(this, arguments));
  };
}
const G = (t, e) => {
  console.error("[Cus warn]: " + t + (e || ""));
};
function H(t, e) {
  const n = Object.create(null),
    r = t.split(",");
  for (let t = 0; r.length > t; t++) n[r[t]] = !0;
  return e ? (t) => !!n[t.toLowerCase()] : (t) => !!n[t];
}
const K = H(
  "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"
);
function Q(t, e) {
  if (t === e) return !0;
  let n = d(t),
    r = d(e);
  if (n || r) return !(!n || !r) && t.getTime() === e.getTime();
  if (((n = g(t)), (r = g(e)), n || r)) return t === e;
  if (((n = u(t)), (r = u(e)), n || r))
    return (
      !(!n || !r) &&
      (function (t, e) {
        if (t.length !== e.length) return !1;
        let n = !0;
        for (let r = 0; n && t.length > r; r++) n = Q(t[r], e[r]);
        return n;
      })(t, e)
    );
  if (((n = m(t)), (r = m(e)), n || r)) {
    if (!n || !r) return !1;
    if (Object.keys(t).length !== Object.keys(e).length) return !1;
    for (const n in t) {
      const r = t.hasOwnProperty(n),
        o = e.hasOwnProperty(n);
      if ((r && !o) || (!r && o) || !Q(t[n], e[n])) return !1;
    }
  }
  return t + "" == e + "";
}
function V(t, e) {
  return t.findIndex((t) => Q(t, e));
}
const X = /["'&<>]/;
function Y(t) {
  const e = "" + t,
    n = X.exec(e);
  if (!n) return e;
  let r,
    o,
    i = "",
    c = 0;
  for (o = n.index; e.length > o; o++) {
    switch (e.charCodeAt(o)) {
      case 34:
        r = "&quot;";
        break;
      case 38:
        r = "&amp;";
        break;
      case 39:
        r = "&#39;";
        break;
      case 60:
        r = "&lt;";
        break;
      case 62:
        r = "&gt;";
        break;
      default:
        continue;
    }
    c !== o && (i += e.slice(c, o)), (c = o + 1), (i += r);
  }
  return c !== o ? i + e.slice(c, o) : i;
}
const tt = /^-?>|<!--|-->|--!>|<!-$/g;
function et(t) {
  return t.replace(tt, "");
}
const nt = (t) =>
    y(t)
      ? t
      : null == t
      ? ""
      : u(t) || (m(t) && (t.toString === o || !b(t.toString)))
      ? JSON.stringify(t, rt, 2)
      : t + "",
  rt = (t, e) =>
    e && e.__v_isRef
      ? rt(t, e.value)
      : f(e)
      ? {
          [`Map(${e.size})`]: [...e.entries()].reduce(
            (t, [e, n]) => ((t[e + " =>"] = n), t),
            {}
          ),
        }
      : p(e)
      ? { [`Set(${e.size})`]: [...e.values()] }
      : !m(e) || u(e) || j(e)
      ? e
      : e + "";
function ot(t) {
  if (u(t)) {
    const e = {};
    for (let n = 0; t.length > n; n++) {
      const r = t[n],
        o = y(r) ? st(r) : ot(r);
      if (o) for (const t in o) e[t] = o[t];
    }
    return e;
  }
  return y(t) || m(t) ? t : void 0;
}
const it = /;(?![^(]*\))/g,
  ct = /:([^]+)/,
  lt = /\/\*.*?\*\//gs;
function st(t) {
  const e = {};
  return (
    t
      .replace(lt, "")
      .split(it)
      .forEach((t) => {
        if (t) {
          const n = t.split(ct);
          n.length > 1 && (e[n[0].trim()] = n[1].trim());
        }
      }),
    e
  );
}
function at(t) {
  let e = "";
  if (!t || y(t)) return e;
  for (const n in t) {
    const r = t[n],
      o = n.startsWith("--") ? n : C(n);
    (y(r) || "number" == typeof r) && (e += `${o}:${r};`);
  }
  return e;
}
function ut(t) {
  let e = "";
  if (y(t)) e = t;
  else if (u(t))
    for (let n = 0; t.length > n; n++) {
      const r = ut(t[n]);
      r && (e += r + " ");
    }
  else if (m(t)) for (const n in t) t[n] && (e += n + " ");
  return e.trim();
}
function ft(t) {
  if (!t) return null;
  let { class: e, style: n } = t;
  return e && !y(e) && (t.class = ut(e)), n && (t.style = ot(n)), t;
}
function pt(t) {
  return (
    !!isObject(t) &&
    (null == t || (isArray(t) ? !t.length : 0 === Object.keys(t).length))
  );
}
function dt(t, e) {
  var n,
    r,
    o,
    i,
    c,
    l = function () {
      var s = Date.now() - i;
      e > s && s >= 0
        ? (n = setTimeout(l, e - s))
        : ((n = null), (c = t.apply(o, r)), n || (o = r = null));
    };
  return function () {
    return (
      (o = this),
      (r = arguments),
      (i = Date.now()),
      n || (n = setTimeout(l, e)),
      c
    );
  };
}
function ht(t, e) {
  let n = Date.now();
  return function () {
    const r = this,
      o = arguments;
    if (Date.now() - n >= e) return (n = Date.now()), t.apply(r, o);
  };
}
function bt(t) {
  return (...e) =>
    t(...e)
      .then((t) => [null, t])
      .catch((t) => [t, null]);
}
function yt(t) {
  const e = new Map();
  return (...n) => {
    let r = n.join("-");
    return e.has(r) || e.set(r, t(...n)), e.get(r);
  };
}
const gt = (t, ...e) =>
  t.length === e.length ? t.call(t, ...e) : (...n) => gt(t, ...e, ...n);
function mt(t) {
  return /^htt(p|ps):\/\//.test(t);
}
function Ot(t, e) {
  var n = window.location.href;
  e && (n = e.indexOf("?") ? e.substr(e.indexOf("?")) : n);
  var r = RegExp("(^|&|\\?)" + t + "=([^&]+)(&|$)", "i"),
    o = n.substr(1).match(r);
  return (null != o && decodeURIComponent(o[2])) || "";
}
function jt(t) {
  var e = {},
    n = (mt(t) ? t : location.href).split("?");
  if (n && n.length >= 2) {
    var r = n[1].split("&");
    if (r && r.length > 0)
      for (var o = 0; r.length > o; o++) {
        var i = r[o].split("=");
        e[i[0]] = i[1];
      }
  }
  return e;
}
function vt(t = "", e = {}, n = !1) {
  let r = t.indexOf("#"),
    o = "",
    i = t,
    c = "";
  0 > r || ((o = t.slice(r)), (i = t.slice(0, r)));
  let l = n ? o : i,
    s = (l && jt(l)) || {};
  e = { ...s, ...e };
  let a = i.indexOf("?");
  return (
    0 > a || ((c = i.slice(a)), (i = i.slice(0, a))),
    n ? (o = o.split("?")[0]) : (c = ""),
    (l = ""),
    Object.keys(e).forEach((t) => {
      e[t] && (l += "&" + t + "=" + e[t]);
    }),
    l && ((l = "?" + l.slice(1)), n ? (o += l) : (c = l)),
    i + c + o
  );
}
function wt(t, e) {
  return new Promise((n) => {
    var r = document.createElement("link");
    (r.type = "text/css"),
      (r.rel = "stylesheet"),
      (r.href = t),
      (r.onerror = r.onload =
        function () {
          n(), isFunction(e) && e();
        }),
      document.head.appendChild(r);
  });
}
function kt(t, e, n) {
  return (
    isFunction(e) || ((n = e), (e = null)),
    new Promise((r, o) => {
      var i = document.createElement("script");
      (i.type = "text/javascript"),
        isObject(n) &&
          Object.keys(n).forEach((t) => {
            n.hasOwnProperty(t) && i.setAttribute(t, n[t]);
          }),
        i.readyState
          ? (i.onreadystatechange = function () {
              ("loaded" != i.readyState && "complete" != i.readyState) ||
                ((i.onreadystatechange = null), isFunction(e) && e(), r());
            })
          : (i.onload = function () {
              isFunction(e) && e(), r();
            }),
        (i.onerror = function () {
          o();
        }),
        (i.src = t),
        document.head.appendChild(i);
    })
  );
}
const xt = (t, e) => {
  if (t instanceof Object) {
    let n,
      r = new Map();
    if (t instanceof Function)
      n = t.prototype
        ? function () {
            return t.apply(this, arguments);
          }
        : (...e) => t.call(void 0, ...e);
    else if (t instanceof Array) n = [];
    else {
      if (t instanceof Date) return +new Date(t);
      n = t instanceof RegExp ? RegExp(t.source, t.flags) : {};
    }
    for (const o in t)
      if (Object.hasOwnProperty.call(t, o))
        if (e && e.has(t)) n[o] = e.get(o);
        else {
          let e = xt(t[o], r);
          r.set(o, e), (n[o] = e);
        }
    return n;
  }
  return t;
};
function At(t, e, n) {
  let r = (Array.isArray(e) ? e : e.split(/[\.\[\]]+/)).reduce(
    (t, e) => (t ? t[e] : t),
    t
  );
  return void 0 === r ? n : r;
}
const Et = [{ key: {}, value: !0 }];
function St(t, e) {
  let n = Et.findIndex((e) => looseEqual(e.key, t));
  if (-1 !== n) return Et[n];
  void 0 !== e && Et.push({ key: t, value: e });
}
function Ct(t, e) {
  let n = "";
  return (
    Object.keys(t).forEach((r) => {
      let [o, i] = r.split("-");
      if (void 0 === i) throw Error("[Error]: 键的表示方式必须为 A-B 形式");
      Number(o) > Number(e) || Number(e) > Number(i) || (n = t[r]);
    }),
    n
  );
}
export {
  e as EMPTY_ARR,
  t as EMPTY_OBJ,
  r as NO,
  n as NOOP,
  vt as addParamsToUrl,
  St as cacheObj,
  yt as cacheStaticFn,
  E as camelize,
  N as capitalize,
  gt as curry,
  dt as debounce,
  xt as deepClone,
  U as def,
  Y as escapeHtml,
  et as escapeHtmlComment,
  F as extend,
  At as get,
  M as getGlobalThis,
  Ct as getObjValByAge,
  jt as getQueryJson,
  Ot as getQueryString,
  I as hasChanged,
  q as hasOwn,
  C as hyphenate,
  _ as invokeArrayFns,
  u as isArray,
  d as isDate,
  s as isDef,
  pt as isEmpty,
  $ as isFalse,
  b as isFunction,
  K as isHTMLTag,
  f as isMap,
  k as isModelListener,
  m as isObject,
  w as isOn,
  j as isPlainObject,
  a as isPrimitive,
  O as isPromise,
  h as isRegExp,
  p as isSet,
  y as isString,
  g as isSymbol,
  P as isTrue,
  l as isUndef,
  mt as isUrl,
  wt as loadCss,
  kt as loadJs,
  Q as looseEqual,
  V as looseIndexOf,
  H as makeMap,
  ut as normalizeClass,
  ft as normalizeProps,
  ot as normalizeStyle,
  o as objectToString,
  Z as once,
  st as parseStringStyle,
  bt as promiseWrapper,
  R as remove,
  at as stringifyStyle,
  ht as throttle,
  L as toArray,
  nt as toDisplayString,
  D as toHandlerKey,
  J as toNumber,
  W as toObject,
  c as toRawType,
  B as toString,
  i as toTypeString,
  G as warn,
};
