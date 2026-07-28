document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const searchInput = document.querySelector("#project-search");
const workGroups = [...document.querySelectorAll(".work-group")];
const visibleCount = document.querySelector("#visible-count");
const noResults = document.querySelector("#no-results");

function updateWorkIndex() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  let total = 0;

  workGroups.forEach((group) => {
    let groupTotal = 0;

    group.querySelectorAll(".index-item").forEach((item) => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) groupTotal += 1;
    });

    group.hidden = groupTotal === 0;
    total += groupTotal;
  });

  visibleCount.textContent = total;
  noResults.hidden = total !== 0;
}

searchInput?.addEventListener("input", updateWorkIndex);

const randomProjectGrid = document.querySelector("[data-random-grid]");

if (randomProjectGrid) {
  const projects = [...randomProjectGrid.querySelectorAll("[data-random-project]")];

  for (let index = projects.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [projects[index], projects[randomIndex]] = [projects[randomIndex], projects[index]];
  }

  projects.forEach((project) => randomProjectGrid.appendChild(project));
}
