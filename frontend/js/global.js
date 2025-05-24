// global.js

// 🧠 1. Auth-check
(function () {
  const feideRole = localStorage.getItem("feide_role");
  if (!feideRole) {
    console.warn("Feide-role not found – not authenticated.");
    // Optional: window.location.href = "/auth.html";
  }
})();

// 🎨 2. Rive-integrasjon
document.addEventListener("DOMContentLoaded", function () {
  const animations = [
    {
      wrapperId: "rive-animation-wrapper",
      canvasId: "rive-animation",
      src: "https://cdn.prod.website-files.com/645e34747a277132dbc911f5/6756af5e5d78374d1feeccb8_matigma_logo.riv"
    }
  ];

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const config = animations.find(animation => animation.wrapperId === entry.target.id);
        if (config) {
          initializeRiveAnimation(config.wrapperId, config.canvasId, config.src);
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.8 });

  animations.forEach(animation => {
    let wrapper = document.getElementById(animation.wrapperId);
    if (wrapper) observer.observe(wrapper);
  });

  function initializeRiveAnimation(wrapperId, canvasId, src) {
    new rive.Rive({
      src: src,
      canvas: document.getElementById(canvasId),
      autoplay: true,
      artboard: "Artboard",
      stateMachines: ["State Machine 1"],
      onLoad: function () {
        const inputs = this.stateMachineInputs("State Machine 1");
        const hoverInput = inputs.find(i => i.name === 'Hover');
        const wrapper = document.getElementById(wrapperId);
        wrapper.addEventListener("mouseover", () => hoverInput.value = true);
        wrapper.addEventListener("mouseout", () => hoverInput.value = false);
        this.resizeDrawingSurfaceToCanvas();
      }
    });
  }
});