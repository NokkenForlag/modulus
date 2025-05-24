export function preloadDropdownState() {
  const openId = localStorage.getItem("open-dropdown-id");
  if (openId) {
    const openElement = document.getElementById(openId);
    if (openElement) {
      openElement.classList.add("open");
    }
  }
}

export function setupDropdowns() {
  const dropdowns = document.querySelectorAll("[data-dropdown-button]");
  dropdowns.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-dropdown-button");
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle("open");
        localStorage.setItem("open-dropdown-id", targetId);
      }
    });
  });
}
