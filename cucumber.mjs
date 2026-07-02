export default {
  import: [
    "./pre-polyfill.mjs",
    "./tsx-register.js",
    "features/support/**/*.ts",
    "features/step-definitions/**/*.tsx",
  ],
  paths: ["features/**/*.feature"],
  format: ["progress-bar"],
};
