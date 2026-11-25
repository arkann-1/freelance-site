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
  return `
    <article class="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-2 text-xs font-semibold">
        <span class="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">${project.category}</span>
        <span class="text-gray-500">${project.status}</span>
      </div>
      <h3 class="mt-4 text-xl font-bold text-gray-900">${project.title}</h3>
      <p class="mt-3 text-gray-600">${project.description}</p>
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
    renderProjects(allProjects);
  } catch (error) {
    console.error(error);
    projectsList.innerHTML = `<p class="text-center text-red-600 md:col-span-2 lg:col-span-3">Proyek gagal dimuat. Coba muat ulang halaman.</p>`;
  }
}

loadServices();
loadProjects();
