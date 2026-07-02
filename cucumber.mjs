export default {
  import: [
    "./pre-polyfill.mjs",
    "./tsx-register.js",
    "./css-loader.mjs",
    "features/support/**/*.ts",
    "features/step-definitions/**/*.tsx",
  ],
  paths: ["features/**/*.feature"],
  format: ["progress-bar"],
};
