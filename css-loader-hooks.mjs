import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Matches both plain "./x.css" and rspack/Vite-style raw asset imports
// like "./x.css?raw".
const CSS_SPECIFIER_RE = /\.css(\?.*)?$/;

export async function resolve(specifier, context, nextResolve) {
  if (CSS_SPECIFIER_RE.test(specifier)) {
    return {
      url: new URL(specifier, context.parentURL).href,
      shortCircuit: true,
    };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (!CSS_SPECIFIER_RE.test(url)) {
    return nextLoad(url, context);
  }

  const parsed = new URL(url);
  const isRaw = parsed.searchParams.has("raw");
  parsed.search = "";
  const css = readFileSync(fileURLToPath(parsed), "utf8");

  // "?raw" imports get the file's text as a plain string, matching
  // rspack/Vite's raw-asset convention (no exports, module has no exports
  // otherwise). Plain ".css" imports are side-effect-only: inject the
  // real stylesheet into jsdom's document, same as the browser ends up
  // with one after rsbuild processes the import.
  const source = isRaw
    ? `export default ${JSON.stringify(css)};`
    : `
        const style = document.createElement("style");
        style.textContent = ${JSON.stringify(css)};
        document.head.appendChild(style);
        export default {};
      `;

  return { format: "module", source, shortCircuit: true };
}
