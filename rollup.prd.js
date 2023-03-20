import { existsSync, unlinkSync } from "fs";
import { terser } from "rollup-plugin-terser";
import config from "./rollup.dev";
import pkg from "./package.json";

let souceMapFile = "dist/index.iife.js.map";
if (existsSync(souceMapFile)) {
  console.log("生产移除 souce-map 文件！");
  unlinkSync(souceMapFile);
}

config.output = [
  {
    file: pkg.main,
    format: "cjs",
    exports: "named",
  },
  {
    file: pkg.module,
    format: "es",
    exports: "named",
  },
];

// 移除开发用的
config.plugins = config.plugins.slice(0, -2);

// 压缩一下
config.plugins.push(
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  })
);

const productCOnfig = {
  ...config,
};

export default productCOnfig;
