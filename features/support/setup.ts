import { After } from "@cucumber/cucumber";
import { cleanup } from "@testing-library/react";

// jsdom is already initialized in tsx-register.js (runs before all imports).
// This hook only needs to clean up RTL's rendered components after each scenario.
After(function () {
  cleanup();
});
