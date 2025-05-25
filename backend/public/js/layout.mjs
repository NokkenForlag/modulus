


export function setupSidebarToggle() {
  const toggleBtn = document.querySelector("[data-sidebar-toggle]");
  const sidebar = document.querySelector("[data-sidebar]");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}

export function setupSlideSections() {
  const sections = document.querySelectorAll("[data-slide-section]");
  let currentIndex = 0;

  const showSection = (index) => {
    sections.forEach((s, i) => s.classList.toggle("active", i === index));
  };

  document.querySelectorAll("[data-slide-next]").forEach(btn =>
    btn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % sections.length;
      showSection(currentIndex);
    })
  );

  document.querySelectorAll("[data-slide-prev]").forEach(btn =>
    btn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + sections.length) % sections.length;
      showSection(currentIndex);
    })
  );

  showSection(currentIndex);
}