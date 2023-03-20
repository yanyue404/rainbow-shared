import babel from "rollup-plugin-babel";
import node from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from "rollup-plugin-json";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import pkg from "./package.json";

const path = require("path");
const resolve = (p) => path.resolve(__dirname, p);

const env = process.env.NODE_ENV;

const isDev = env === "development";
const isPrd = env === "production";

const config = {
  input: "./src/main.js",
  output: [
    {
      file: pkg.iife,
      format: "iife", //输出格式 amd es6 iife umd cjs
      // window.MyBundle.exportFunctionName
      name: "R", //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
      banner: `/* ${pkg.name} version " + ${pkg.version} + " */`,
      intro: 'var ENVIRONMENT = "production";',
      sourcemap: isDev, // 生成 bundle.map.js文件，方便调试
    },
  ],
  plugins: [
    node(),
    // 先不用 babel
    // babel({
    //   exclude: "node_modules/**", // 只编译我们的源代码
    // }),
    json(),
    postcss(),
    alias({
      entries: {
        "@": resolve("src"),
        "~": resolve("../"),
      },
      customResolver: node({
        extensions: [".vue", ".js", ".scss"],
      }),
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    commonjs(),
  ],
  global: {
    lodash: "_", //告诉rollup全局变量
  },
  external: ["lodash", "core-js"], // 不参与打包，使用外部引用
};

if (isDev) {
  config.plugins.push(
    // 热更新与开启本地服务器
    livereload(),
    serve({
      open: true,
      port: 8001,
      contentBase: ["demo", "dist"],
    })
  );
}

export default config;
