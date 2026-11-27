const servicesList = document.querySelector("#services-list");

function createServiceCard(service) {
  const features = service.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  return `
    <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 class="text-xl font-bold text-gray-900">${service.name}</h3>
      <p class="mt-3 text-gray-600">${service.description}</p>
      <p class="mt-4 text-sm text-gray-500">
        <span class="font-semibold text-gray-700">Cocok untuk:</span>
        ${service.suitableFor}
      </p>
      <ul class="mt-6 list-disc space-y-2 border-t border-gray-100 pt-6 pl-5 text-sm text-gray-700">
        ${features}
      </ul>
    </article>
  `;
}

async function loadServices() {
  servicesList.innerHTML = `<p class="text-center text-gray-500 lg:col-span-3">Memuat layanan...</p>`;

  try {
    const response = await fetch("./data/services.json");

    if (!response.ok) {
      throw new Error("Gagal memuat data layanan: " + response.status);
    }

    const services = await response.json();
    servicesList.innerHTML = services.map(createServiceCard).join("");
  } catch (error) {
    console.error(error);
    servicesList.innerHTML = `<p class="text-center text-red-600 lg:col-span-3">Layanan gagal dimuat. Coba muat ulang halaman.</p>`;
  }
}

const projectsList = document.querySelector("#projects-list");
let allProjects = [];

function createProjectCard(project) {
  const techBadges = project.tech
    .map(
      (tech) =>
        `<li class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">${tech}</li>`,
    )
    .join("");

  const linkHtml = project.link
    ? `<div class="mt-auto pt-6">
         <a href="${project.link}" target="_blank" rel="noopener noreferrer" aria-label="Lihat proyek ${project.title}" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lihat proyek</a>
       </div>`
    : "";

  return `
    <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-2 text-xs font-semibold">
        <span class="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">${project.category}</span>
        <span class="text-gray-500">${project.status}</span>
      </div>
      <h3 class="mt-4 text-xl font-bold text-gray-900">${project.title}</h3>
      <p class="mt-3 text-gray-600">${project.description}</p>
      <ul class="mt-4 flex flex-wrap gap-2">${techBadges}</ul>
      ${linkHtml}
    </article>
  `;
}

function renderProjects(projects) {
  if (projects.length === 0) {
    projectsList.innerHTML = `<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">Tidak ada proyek yang cocok.</p>`;
    return;
  }

  projectsList.innerHTML = projects.map(createProjectCard).join("");
}

async function loadProjects() {
  projectsList.innerHTML = `<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">Memuat proyek...</p>`;

  try {
    const response = await fetch("./data/projects.json");

    if (!response.ok) {
      throw new Error("Gagal memuat data proyek: " + response.status);
    }

    allProjects = await response.json();
    applyFilter();
  } catch (error) {
    console.error(error);
    projectsList.innerHTML = `<p class="text-center text-red-600 md:col-span-2 lg:col-span-3">Proyek gagal dimuat. Coba muat ulang halaman.</p>`;
  }
}

const filtersContainer = document.querySelector("#project-filters");
let activeCategory = "Semua";

function getCategories(projects) {
  const categories = projects.map((project) => project.category);
  return ["Semua", ...new Set(categories)];
}

function renderFilters() {
  filtersContainer.innerHTML = getCategories(allProjects)
    .map((category) => {
      const isActive = category === activeCategory;
      const classes = isActive
        ? "rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        : "rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900";

      return `<button type="button" data-category="${category}" aria-pressed="${isActive}" class="${classes}">${category}</button>`;
    })
    .join("");
}

function applyFilter() {
  const filtered =
    activeCategory === "Semua"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  renderProjects(filtered);
  renderFilters();
}

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  activeCategory = button.dataset.category;
  applyFilter();
});

// FAQ
const faqList = document.querySelector("#faq-list");

faqList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const isOpen = button.getAttribute("aria-expanded") === "true";
  const panel = document.getElementById(button.getAttribute("aria-controls"));

  button.setAttribute("aria-expanded", String(!isOpen));
  panel.hidden = isOpen;
});

loadServices();
loadProjects();
