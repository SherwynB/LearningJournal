const currentYear = new Date().getFullYear();

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = currentYear;
});

const searchInput = document.querySelector("#project-search");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const workCards = [...document.querySelectorAll(".work-card")];
const visibleCount = document.querySelector("#visible-count");
const emptyState = document.querySelector("#empty-state");

let activeFilter = "all";

function filterProjects() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  let matches = 0;

  workCards.forEach((card) => {
    const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
    let cardMatches = 0;

    card.querySelectorAll(".project-list li").forEach((item) => {
      const textMatches = item.textContent.toLowerCase().includes(query);
      const isVisible = categoryMatches && textMatches;
      item.hidden = !isVisible;
      if (isVisible) cardMatches += 1;
    });

    card.hidden = cardMatches === 0;
    matches += cardMatches;
  });

  if (visibleCount) visibleCount.textContent = matches;
  if (emptyState) emptyState.hidden = matches !== 0;
}

searchInput?.addEventListener("input", filterProjects);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });
    filterProjects();
  });
});
