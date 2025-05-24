import katex from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs";

export function renderKatex() {
  const elements = document.querySelectorAll("[data-katex]");
  elements.forEach((el) => {
    const expression = el.getAttribute("data-katex");
    if (expression) {
      katex.render(expression, el, {
        throwOnError: false,
        output: "html",
      });
    }
  });
}
