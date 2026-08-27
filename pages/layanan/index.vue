<template>
  <div>
    <div class="p-3">
      <div class="text-center mb-4 mt-2">
        <div class="d-flex justify-content-end p-2">
          <small class="fw-bold">v{{ version }}</small>
        </div>
        <h5 class="fw-bold text-dark">Layanan Utama</h5>
        <p class="text-secondary small">Pilih modul layanan di bawah ini</p>
      </div>

      <!-- Laundry Widget (bg-info applied to icon circle) -->
      <nuxt-link to="/laundry" class="text-decoration-none">
        <div class="card border-0 shadow-sm rounded-4 mb-3 p-3 d-flex flex-row align-items-center menu-card">
          <div class="bg-info text-white d-flex justify-content-center align-items-center rounded-circle me-3" style="width: 50px; height: 50px">
            <i class="bi bi-droplet-fill h5 mb-0"></i>
          </div>
          <div>
            <h6 class="fw-bold text-dark mb-0">Laundry</h6>
            <span class="text-secondary" style="font-size: 0.8rem">Cek tagihan & riwayat pakaian</span>
          </div>
          <i class="bi bi-chevron-right ms-auto text-secondary"></i>
        </div>
      </nuxt-link>

      <!-- Mutabaah Widget (bg-warning applied to icon circle) -->
      <nuxt-link to="/mutabaah" class="text-decoration-none">
        <div class="card border-0 shadow-sm rounded-4 mb-3 p-3 d-flex flex-row align-items-center menu-card">
          <div class="bg-warning text-white d-flex justify-content-center align-items-center rounded-circle me-3" style="width: 50px; height: 50px">
            <i class="bi bi-journal-text h5 mb-0"></i>
          </div>
          <div>
            <h6 class="fw-bold text-dark mb-0">Mutabaah</h6>
            <span class="text-secondary" style="font-size: 0.8rem">Catatan hafalan & aktivitas</span>
          </div>
          <i class="bi bi-chevron-right ms-auto text-secondary"></i>
        </div>
      </nuxt-link>

      <!-- Laporan Widget -->
      <nuxt-link to="/laporan" class="text-decoration-none">
        <div class="card border-0 shadow-sm rounded-4 mb-3 p-3 d-flex flex-row align-items-center menu-card">
          <div class="bg-primary text-white d-flex justify-content-center align-items-center rounded-circle me-3" style="width: 50px; height: 50px">
            <i class="bi bi-file-earmark-bar-graph-fill h5 mb-0"></i>
          </div>
          <div>
            <h6 class="fw-bold text-dark mb-0">Laporan</h6>
            <span class="text-secondary" style="font-size: 0.8rem">Rekapitulasi data nilai santri</span>
          </div>
          <i class="bi bi-chevron-right ms-auto text-secondary"></i>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "utama",
    data() {
      return {
        version: 0,
      };
    },
    created() {
      this.version = process.env.version;
    },
  };
</script>

<style scoped>
  .menu-card {
    transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  .menu-card:active,
  .menu-card:hover {
    transform: scale(0.98);
    background-color: #f8f9fa !important;
    cursor: pointer;
  }
</style>
