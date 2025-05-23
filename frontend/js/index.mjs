// scripts/index.mjs

import Rive from "https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.7.1/+esm";

// === Rive function ===
export function createRive(riveFilePath, canvasId = "rive-canvas") {
  const riveCanvas = document.getElementById(canvasId);

  if (!riveCanvas) {
    console.warn(`⛔️ Could not find canvas with id "${canvasId}"`);
    return;
  }

  const layout = new Rive.Layout({
    fit: Rive.Fit.Contain,
    alignment: Rive.Alignment.Center,
  });

  const riveInstance = new Rive.Rive({
    src: riveFilePath,
    canvas: riveCanvas,
    autoplay: true,
    stateMachines: "State Machine 1",
    layout,
    onLoad: () => {
      riveInstance.resizeDrawingSurfaceToCanvas(window.devicePixelRatio || 1);
    },
    onError: (err) => {
      console.error("🚨 Rive error:", err);
    }
  });

  window.addEventListener("resize", () => {
    riveInstance.resizeDrawingSurfaceToCanvas(window.devicePixelRatio || 1);
  });

  return riveInstance;
}

// === Utility for localStorage access ===
const canUseStorage = (() => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
})();

function updateDropdownHeight(content) {
  content.style.maxHeight = content.scrollHeight + "px";
  content.style.opacity = "1";
}

// === Dynamic initialization of multiple Rive icons from CMS ===
const baseUrl = "https://nokkenforlag.github.io/matigma-assets/";

function setupRiveCanvases() {
  const riveCanvases = document.querySelectorAll("canvas[data-rive]");

  if (!riveCanvases.length) {
    console.info("🎨 No Rive canvas found on this page.");
  }

  riveCanvases.forEach((canvas) => {
    if (!canvas) {
      console.warn("⛔️ Canvas element missing.");
      return;
    }

    const filePath = canvas.getAttribute("data-rive");
    if (!filePath) {
      console.warn("⛔️ Missing data-rive attribute.");
      return;
    }

    // Read visual size from CSS
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    const dpr = window.devicePixelRatio || 1;

    // Scale for sharpness
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const fullUrl = baseUrl + filePath;

    const riveInstance = new Rive.Rive({
      src: fullUrl,
      canvas: canvas,
      autoplay: true,
      stateMachines: ["State Machine 1"],
      layout: new Rive.Layout({
        fit: Rive.Fit.Contain,
        alignment: Rive.Alignment.Center,
      }),
    onLoad: () => {
      riveInstance.resizeDrawingSurfaceToCanvas(dpr);
    },
      onError: (err) => {
        console.error("🚨 Error:", err);
      }
    });
  });
}

// === Iframe auto-height script ===
function sendHeight() {
  if (window.self !== window.top) {
    // Send the height of the document to the parent page
    window.parent.postMessage({
      type: 'setHeight',
      height: document.documentElement.scrollHeight + 8
    }, '*');
  }
}

// === KaTeX auto-rendering ===
function setupKaTeX() {
  if (typeof renderMathInElement !== "undefined") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]
    });
  } else {
    console.warn("⚠️ renderMathInElement is not defined – check that KaTeX is loaded.");
  }
}

// === Dropdown with localStorage support ===
function preloadDropdownState() {
  document.body.classList.add("instant");
  document.querySelectorAll(".ui-dropdown-wrapper").forEach((wrapper, index) => {
    const stored = canUseStorage ? localStorage.getItem(`dropdown-open-${index}`) : null;
    let isOpen = stored === null ? true : stored === "true";
    if (wrapper.classList.contains("closed-by-default")) {
      isOpen = false;
    }
    const content = wrapper.querySelector(".ui-dropdown-content");
    if (isOpen && content) {
      wrapper.classList.add("open");
      updateDropdownHeight(content);
    }
  });
  requestAnimationFrame(() => {
    document.body.classList.remove("instant");
  });
}

function setupDropdowns() {
  const dropdowns = document.querySelectorAll(".ui-dropdown-wrapper");

  dropdowns.forEach((wrapper, index) => {
    const toggle = wrapper.querySelector(".ui-dropdown-flex-div");
    const content = wrapper.querySelector(".ui-dropdown-content");
    const icon = wrapper.querySelector(".ui-dropdown-button-icon");

    if (!toggle || !content || !icon) {
      console.warn(`⛔️ Dropdown content missing in wrapper #${index}`);
      return;
    }

    const storageKey = `dropdown-open-${index}`;

    // Load stored state, open by default if not stored
    const stored = canUseStorage ? localStorage.getItem(storageKey) : null;
    const isOpen = stored === null ? true : stored === "true";

    toggle.addEventListener("click", () => {
      const currentlyOpen = wrapper.classList.contains("open");
      if (currentlyOpen) {
        wrapper.classList.remove("open");
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        if (canUseStorage) {
          localStorage.setItem(storageKey, "false");
        }
      } else {
        wrapper.classList.add("open");
        requestAnimationFrame(() => {
          updateDropdownHeight(content);
        });

        const observer = new MutationObserver(() => {
          updateDropdownHeight(content);
        });

        observer.observe(content, {
          childList: true,
          subtree: true,
        });

        setTimeout(() => {
          observer.disconnect();
        }, 500);
        if (canUseStorage) {
          localStorage.setItem(storageKey, "true");
        }
      }
    });

    if (wrapper.classList.contains("ui-dropdown-closable")) {
      document.addEventListener("click", (event) => {
        const clickedInside = wrapper.contains(event.target);
        const clickedToggle = toggle.contains(event.target);

        if (!clickedInside && !clickedToggle && wrapper.classList.contains("open")) {
          wrapper.classList.remove("open");
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
          if (canUseStorage) {
            localStorage.setItem(storageKey, "false");
          }
        }
      });
    }
  });

  // Update maxHeight and opacity of open dropdowns on window resize
  window.addEventListener("resize", () => {
    dropdowns.forEach((wrapper) => {
      if (wrapper.classList.contains("open")) {
        const content = wrapper.querySelector(".ui-dropdown-content");
        if (content) {
          updateDropdownHeight(content);
        }
      }
    });
  });
}

function setupSidebarToggle() {
  const toggleButton = document.querySelector(".ui-menu-toggle-button");
  const sidebar = document.querySelector(".ui-sidebar-wrapper");

  if (!toggleButton || !sidebar) return;

  toggleButton.addEventListener("click", () => {
    const isNowOpen = !document.body.classList.contains("sidebar-visible");
    if (isNowOpen) {
      document.body.classList.add("sidebar-visible");
      document.body.classList.add("instant");
      requestAnimationFrame(() => {
        document.body.classList.remove("instant");
      });
    } else {
      document.body.classList.remove("sidebar-visible");
    }
  });
}

function setupSidebarCloseOnOutsideClick() {
  const sidebar = document.querySelector(".ui-sidebar-wrapper");
  const toggleButton = document.querySelector(".ui-menu-toggle-button");

  document.addEventListener("click", (event) => {
    const isSidebarOpen = document.body.classList.contains("sidebar-visible");

    if (
      isSidebarOpen &&
      sidebar &&
      toggleButton &&
      !sidebar.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      document.body.classList.remove("sidebar-visible");
    }
  });
}

function setupCollectionItemToggles() {
  const items = document.querySelectorAll(".ui-collection-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".ui-collection-item-content-div");
    const panel = item.querySelector(".ui-collection-item-right");

    if (!trigger || !panel) return;

    // Hover state for .ui-highlight
    trigger.addEventListener("mouseenter", () => {
      item.classList.add("ui-highlight");
    });
    trigger.addEventListener("mouseleave", () => {
      if (!item.classList.contains("open")) {
        item.classList.remove("ui-highlight");
      }
    });

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      const currentlyOpen = document.querySelector(".ui-collection-item.open");

      if (isOpen) {
        item.classList.remove("open");
        item.classList.remove("ui-highlight");
        return;
      }

      if (currentlyOpen && currentlyOpen !== item) {
        currentlyOpen.classList.remove("open");
        currentlyOpen.classList.remove("ui-highlight");
        setTimeout(() => {
          item.classList.add("open");
          item.classList.add("ui-highlight");
        }, 600); // match the duration of fade out
      } else {
        item.classList.add("open");
        item.classList.add("ui-highlight");
      }
    });
  });
}

function initializePage() {
  setupRiveCanvases();
  setupKaTeX();
  setupSidebarToggle();
  setupSidebarCloseOnOutsideClick();
  preloadDropdownState();
  setupDropdowns();
  setupCollectionItemToggles();

  const isEmbedded = window.self !== window.top;
  const referrer = document.referrer || "";

  const isWebflowIframe =
    isEmbedded &&
    referrer &&
    (referrer.includes("webflow.io") || referrer.includes("webflow-preview"));

  if (isWebflowIframe) {
    document.documentElement.classList.add("no-scroll");
  } else {
    document.documentElement.classList.remove("no-scroll");
  }

  if (
    document.body.classList.contains("sidebar-visible") &&
    window.matchMedia("(max-width: 991px)").matches
  ) {
    document.body.classList.add("instant");
    requestAnimationFrame(() => {
      document.body.classList.remove("instant");
    });
  }

  setupSlideNavigation();
  document.body.classList.add("js-ready");
}

document.addEventListener("DOMContentLoaded", () => {
  initializePage();
  sendHeight();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(sendHeight, 100);
});

// Fade in page once fully loaded
window.addEventListener("load", () => {
  document.documentElement.classList.add("loaded");
});

function setupSlideNavigation() {
  const slides = document.querySelectorAll(".math-slide");
  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");

  if (!slides.length || !nextBtn || !prevBtn) return;

  let currentIndex = 0;

  // Centralized scroll overflow detection
  function updateScrollIndicators(slide) {
    const content = slide.querySelector(".slide-content");
    const tolerance = 2; // Mindre verdi gir mer nøyaktig deteksjon

    if (!content) return;

    const scrollTop = content.scrollTop;
    const scrollBottom = content.scrollHeight - content.clientHeight - scrollTop;

    const hasTop = scrollTop > tolerance;
    const hasBottom = scrollBottom > tolerance;

    slide.classList.toggle("has-top-overflow", hasTop);
    slide.classList.toggle("has-overflow", hasBottom);
  }

  // Progress indicator support (optional)
  function updateProgress(index) {
    const progress = document.querySelector(".slide-progress");
    if (progress) {
      progress.textContent = `Side ${index + 1} av ${slides.length}`;
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle("active", isActive);

      if (isActive) {
        const content = slide.querySelector(".slide-content");

        if (content) {
          content.scrollTop = 0;

          requestAnimationFrame(() => {
            updateScrollIndicators(slide);
          });

          // Listen to scroll to detect top overflow dynamically
          content.addEventListener("scroll", () => {
            updateScrollIndicators(slide);
          }, { passive: true });
        }
      }
    });

    updateProgress(index);
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && currentIndex < slides.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }
  });

  // Optional: swipe support for mobile
  let touchStartX = null;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const dx = touchStartX - touchEndX;

    if (dx > 50 && currentIndex < slides.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
    } else if (dx < -50 && currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }

    touchStartX = null;
  }, { passive: true });

  // Initialize progress and first slide
  showSlide(currentIndex);
  updateProgress(currentIndex);

  // Update scroll indicator on window resize for accuracy/responsiveness
  window.addEventListener("resize", () => {
    showSlide(currentIndex);
  });
}