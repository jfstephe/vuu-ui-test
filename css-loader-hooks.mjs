export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith(".css")) {
    return {
      url: new URL(specifier, context.parentURL).href,
      shortCircuit: true,
    };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".css")) {
    return {
      format: "module",
      source: `
        import { readFileSync } from "node:fs";
        import { fileURLToPath } from "node:url";
        const css = readFileSync(fileURLToPath(${JSON.stringify(url)}), "utf8");
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
        export default {};
      `,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
