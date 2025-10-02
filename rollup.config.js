export default [
  // Browser-friendly UMD build
  {
    input: "eit-icons.js",
    output: {
      name: "EitIcons",
      file: "dist/eit-icons.umd.js",
      format: "umd",
      exports: "named",
      sourcemap: true,
    },
  },

  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: "eit-icons.js",
    output: [
      {
        file: "dist/eit-icons.cjs.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: "dist/eit-icons.esm.js",
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
