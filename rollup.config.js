import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js", // entry file
  output: {
    file: "dist/index.bundle.js",
    format: "iife", // classic browser format
  },
  plugins: [resolve()],
};
