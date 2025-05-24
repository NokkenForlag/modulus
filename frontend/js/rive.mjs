// This module sets up Rive animations for <canvas data-rive="..."> elements.
// It loads Rive from CDN and initializes the animations.

// Import Rive from CDN
import Rive from "https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.11.1/+esm";

/**
 * Finds all <canvas data-rive="..."> elements and initializes Rive animations on them.
 * @param {string} baseUrl - The base URL to resolve relative .riv file paths.
 */
export function setupRiveCanvases(baseUrl) {
  const canvases = document.querySelectorAll('canvas[data-rive]');
  canvases.forEach(canvas => {
    const rivePath = canvas.getAttribute('data-rive');
    if (!rivePath) return;
    // Compute the full URL to the .riv file
    const url = rivePath.match(/^https?:\/\//) ? rivePath : baseUrl.replace(/\/$/, '') + '/' + rivePath.replace(/^\//, '');
    // Optionally, allow specifying artboard/animation/stateMachine via data attributes
    const artboard = canvas.getAttribute('data-rive-artboard') || undefined;
    const animation = canvas.getAttribute('data-rive-animation') || undefined;
    const stateMachine = canvas.getAttribute('data-rive-state-machine') || undefined;
    // eslint-disable-next-line no-new
    new Rive({
      src: url,
      canvas: canvas,
      autoplay: true,
      artboard,
      animation,
      stateMachine,
    });
  });
}

/**
 * Creates a Rive animation on a canvas with the given ID.
 * Uses artboard "Layout", state machine "State Machine 1", responsive resize, and logs errors.
 * @param {string} riveFilePath - The path or URL to the .riv file.
 * @param {string} [canvasId="rive-canvas"] - The ID of the canvas element to use.
 * @returns {Rive | null} The Rive instance or null if canvas not found.
 */
export function createRive(riveFilePath, canvasId = "rive-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with id "${canvasId}" not found.`);
    return null;
  }

  const rive = new Rive({
    src: riveFilePath,
    canvas: canvas,
    artboard: "Layout",
    stateMachines: "State Machine 1",
    autoplay: true,
    fit: Rive.Fit.Contain,
    onError: (error) => {
      console.error("Rive error:", error);
    },
    // Enable responsive resizing
    layout: new Rive.Layout({
      fit: Rive.Fit.Contain,
      alignment: Rive.Alignment.Center,
      minX: 0,
      minY: 0,
      maxX: 1,
      maxY: 1,
    }),
  });

  return rive;
}