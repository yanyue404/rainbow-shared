# rainbow-shared

[![NPM version](https://img.shields.io/npm/v/rainbow-shared.svg?style=flat)](https://www.npmjs.com/package/rainbow-shared) [![NPM monthly downloads](https://img.shields.io/npm/dm/rainbow-shared.svg?style=flat)](https://npmjs.org/package/rainbow-shared) [![NPM total downloads](https://img.shields.io/npm/dt/rainbow-shared.svg?style=flat)](https://npmjs.org/package/rainbow-shared)

rainbow 的 实用函数， 基于 @vue/shared

## support utils

```js
export {
  EMPTY_ARR,
  EMPTY_OBJ,
  NO,
  NOOP,
  camelize,
  capitalize,
  debounce,
  def,
  escapeHtml,
  escapeHtmlComment,
  extend,
  getGlobalThis,
  hasChanged,
  hasOwn,
  hyphenate,
  invokeArrayFns,
  isArray,
  isDate,
  isDef,
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
  looseEqual,
  looseIndexOf,
  makeMap,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  objectToString,
  once,
  parseStringStyle,
  remove,
  stringifyStyle,
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


## cdn

- https://cdn.jsdelivr.net/npm/rainbow-shared/dist/index.iife.js
- https://unpkg.com/rainbow-shared/dist/index.iife.js

**demo**

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

## npm use

```bash
npm install rainbow-shared
```
