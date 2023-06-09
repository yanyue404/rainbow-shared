# rainbow-shared

[![NPM version](https://img.shields.io/npm/v/rainbow-shared.svg?style=flat)](https://www.npmjs.com/package/rainbow-shared) [ ![NPM monthly downloads](https://img.shields.io/npm/dm/rainbow-shared.svg?style=flat)](https://npmjs.org/package/rainbow-shared) [![ NPM total downloads](https://img.shields.io/npm/dt/rainbow-shared.svg?style=flat)](https://npmjs.org/package/rainbow-shared)

Utility functions for rainbow, based on @vue/shared

## Install

```bash
npm i rainbow-shared -S
```

## Usage

**ES module**

```js
import { looseEqual } from "rainbow-shared";

console.log(looseEqual(["Hello, world!"], ["Hello, world!"])); // true
```

**CommonJS**

```js
const { looseEqual } = require("rainbow-shared");

console.log(looseEqual(["Hello, world!"], ["Hello, world!"])); // true
```

**CDN link**

> Packaged in `iife` mode to generate a global object `R`.

- https://cdn.jsdelivr.net/npm/rainbow-shared/dist/index.iife.js
- https://unpkg.com/rainbow-shared/dist/index.iife.js

```html
<!DOCTYPE html>
<html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>rainbow-shared use cdn</title>
   </head>
   <body>
     <script src="https://cdn.jsdelivr.net/npm/rainbow-shared/dist/index.iife.js"></script>

     <script>
       console.log(R.looseEqual(["Hello,world!"], ["Hello,world!"])); // true
     </script>
   </body>
</html>
```

## Support utils

You can check the function source code through [cdn link](https://cdn.jsdelivr.net/npm/rainbow-shared/dist/index.iife.js) for usage.

```js
export {
   EMPTY_ARR,
   EMPTY_OBJ,
   NO,
   NOOP,
   addParamsToUrl,
   cacheObj,
   cacheStaticFn,
   camelize,
   capitalize,
   curry,
   debounce,
   deepClone,
   def,
   escapeHtml,
   escapeHtmlComment,
   extend,
   get,
   getGlobalThis,
   getObjValByAge,
   getQueryJson,
   getQueryString,
   hasChanged,
   hasOwn,
   hyphenate,
   invokeArrayFns,
   isArray,
   isDate,
   isDef,
   isEmpty,
   isFalse,
   isFunction,
   isHTMLTag,
   isMap,
   isModelListener,
   isObject,
   isOn,
   isPlainObject,
   isPrimitive,
   isPromise,
   isRegExp,
   isSet,
   isString,
   isSymbol,
   isTrue,
   isUndef,
   isUrl,
   loadCss,
   loadJs,
   looseEqual,
   looseIndexOf,
   makeMap,
   normalizeClass,
   normalizeProps,
   normalizeStyle,
   objectToString,
   once,
   parseStringStyle,
   promiseWrapper,
   remove,
   stringifyStyle,
   throttle,
   toArray,
   toDisplayString,
   toHandlerKey,
   toNumber,
   toObject,
   toRawType,
   toString,
   toTypeString,
   warn,
};
```

## Reference

- https://github.com/vuejs/core/tree/main/packages/shared
- https://github.com/slorber/awesome-only-resolves-last-promise
