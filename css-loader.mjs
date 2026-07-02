// Makes CSS imports work under cucumber-js/tsx. Node's ESM loader has no
// notion of .css files — rsbuild handles that at build time in the real
// app, but a bare `import "./x.css"` throws "Unknown file extension" under
// plain Node/tsx. Instead of stubbing the import out, we read the real file
// and append its contents to jsdom's document as a <style> tag, same as the
// browser ends up with one after rsbuild processes the import — so styles
// actually apply in tests.
//
// Uses register() (DEP0205, deprecated in favor of the sync registerHooks())
// rather than the replacement, because tsx registers its own loader with
// register() too, on the same off-thread async hook chain. registerHooks()
// runs on a separate synchronous chain that doesn't compose with it —
// mixing the two breaks resolve/load delegation to tsx's hook. Revisit if
// tsx moves to registerHooks(), or once register() actually stops working.
import { register } from "node:module";

register("./css-loader-hooks.mjs", import.meta.url);
