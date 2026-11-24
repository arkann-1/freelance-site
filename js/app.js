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

loadServices();
