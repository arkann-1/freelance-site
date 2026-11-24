async function loadServices() {
  try {
    const response = await fetch("./data/services.json");

    if (!response.ok) {
      throw new Error("Gagal memuat data layanan: " + response.status);
    }

    const services = await response.json();
    console.log(services);
  } catch (error) {
    console.error(error);
  }
}

loadServices();
