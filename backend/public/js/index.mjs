import { requireFeideRole } from "./auth.mjs";
import { setupRiveCanvases } from "./rive.mjs";
import { preloadDropdownState, setupDropdowns } from "./dropdown.mjs";
import { setupSidebarToggle, setupSlideSections } from "./layout.mjs";
import { renderKatex } from "./katex.mjs";

function initializePage() {
  if (document.body.dataset.auth === "required") {
    requireFeideRole("/auth.html");
  }

  setupRiveCanvases("https://nokkenforlag.github.io/matigma-assets/");
  renderKatex();
  setupSidebarToggle();
  preloadDropdownState();
  setupDropdowns();
  setupSlideSections();

  document.body.classList.add("js-ready");
}

document.addEventListener("DOMContentLoaded", initializePage);