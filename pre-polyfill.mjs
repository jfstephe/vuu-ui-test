// This file must be loaded BEFORE tsx-register.js.
// tsx's ESM loader interferes with named re-exports in the nested @dnd-kit
// packages bundled with @vuu-ui/vuu-utils on Node.js v22 (known tsx issue).
// Pre-importing the VUU packages here caches them BEFORE tsx registers its
// loader hook, so subsequent imports in test files hit the cache unchanged.

import globalJsdom from "global-jsdom";

// Browser-like environment needed at VUU module load time.
globalJsdom();

// Node.js 20+ has a built-in AbortController, but its AbortSignal fails jsdom's
// EventTarget.addEventListener type-checking (jsdom checks signal instanceof its
// own internal AbortSignal class). Override globalThis so @dnd-kit/dom's
// PointerSensor creates jsdom-compatible AbortSignals at render time.
globalThis.AbortController = window.AbortController;
globalThis.AbortSignal = window.AbortSignal;

// vuu-utils uses `new ResizeObserver(...)` at module scope; jsdom doesn't
// provide it. The VUU Table only mounts TableCore after it receives a size
// via ResizeObserver, so we fire the callback synchronously with a fixed size
// so the table renders its content in tests.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    constructor(callback) {
      this._callback = callback;
    }
    observe(target) {
      this._callback([{
        target,
        contentRect: { width: 0, height: 0 },
        borderBoxSize: [{ blockSize: 0, inlineSize: 0 }],
        contentBoxSize: [{ blockSize: 0, inlineSize: 0 }],
      }]);
    }
    unobserve() {}
    disconnect() {}
  };
}

if (!globalThis.Worker) {
  globalThis.Worker = class Worker {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() { return true; }
    onmessage = null;
    onerror = null;
  };
}

// Tell React 18+ we're in a test environment.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Pre-cache the VUU packages. This import must succeed without tsx.
await import("@vuu-ui/vuu-data-test");
await import("@vuu-ui/vuu-table");
