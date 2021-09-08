import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript({
        typescript: require("typescript"),
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        extract: true,
        // minimize: isProduction,
        modules: true,
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
      {
        file: "example/src/reactComponentLib/index.js",
        format: "es",
        banner: "/* eslint-disable */",
      },
    ],
  },
];
