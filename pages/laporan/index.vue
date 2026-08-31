<template>
  <div class="container-fluid min-vh-100 bg-light pb-5 pt-3 px-3 d-flex justify-content-center font-sans">
    <div class="w-100" style="max-width: 600px">
      <!-- Version Header -->
      <div class="text-center fw-bold text-dark mb-4" style="font-size: 0.75rem">v{{ version }}</div>

      <!-- 1. Student Information Card -->
      <div class="card border-0 shadow-sm rounded-4 p-3 mb-4 d-flex flex-row align-items-center gap-3">
        <div
          class="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0"
          style="width: 48px; height: 48px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div class="d-flex flex-column">
          <h2 class="h6 fw-bold text-dark mb-1">Nama: {{ santri.nama }}</h2>
          <p class="mb-0 text-muted" style="font-size: 0.75rem">
            Kelas:
            <span class="fw-semibold text-dark">{{ santri.kelas }}</span>
          </p>
          <p class="mb-0 text-muted" style="font-size: 0.75rem">
            Wali Kelas:
            <span class="fw-semibold text-dark">{{ santri.waliKelas }}</span>
          </p>
        </div>
      </div>

      <!-- 2. Attendance Section -->
      <div class="mb-5">
        <!-- Main Total Banner -->
        <div class="card border-0 rounded-4 p-4 text-center text-white shadow-sm mb-3 custom-gradient">
          <div class="d-flex align-items-center justify-content-center gap-2 mb-2 text-white-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
            <span class="text-uppercase fw-semibold" style="font-size: 0.7rem; letter-spacing: 1px">Total Kehadiran</span>
          </div>
          <div class="display-6 fw-bold mb-1">{{ kehadiran.totalHari }} Hari</div>
          <div class="text-white-50" style="font-size: 0.75rem">Semester Ganjil 2026</div>
        </div>

        <!-- Breakdown Grid -->
        <div class="row g-2">
          <div class="col-3">
            <div class="card border-0 text-center p-2 rounded-3 shadow-sm h-100">
              <span class="text-muted fw-medium mb-1" style="font-size: 0.65rem">Sakit</span>
              <span class="fs-5 fw-bold text-primary">{{ kehadiran.sakit }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="card border-0 text-center p-2 rounded-3 shadow-sm h-100">
              <span class="text-muted fw-medium mb-1" style="font-size: 0.65rem">Izin</span>
              <span class="fs-5 fw-bold text-warning">{{ kehadiran.izin }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="card border-0 text-center p-2 rounded-3 shadow-sm h-100">
              <span class="text-muted fw-medium mb-1" style="font-size: 0.65rem">Alpha</span>
              <span class="fs-5 fw-bold text-danger">{{ kehadiran.alpha }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="card border-0 text-center p-2 rounded-3 shadow-sm h-100">
              <span class="text-muted fw-medium mb-1" style="font-size: 0.65rem">Telat</span>
              <span class="fs-5 fw-bold text-orange">{{ kehadiran.terlambat }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Grades Section -->
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 px-1">
          <h3 class="h6 fw-bold text-dark mb-0">Riwayat Nilai</h3>
          <span class="badge bg-secondary bg-opacity-10 text-secondary border rounded-pill py-2 px-3" style="font-size: 0.65rem">
            {{ nilaiPelajaran.length }} Mata Pelajaran
          </span>
        </div>

        <div class="d-flex flex-column gap-2">
          <!-- Grade Cards Loop -->
          <div
            v-for="(pelajaran, index) in nilaiPelajaran"
            :key="index"
            class="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <div
                class="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                style="width: 40px; height: 40px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <div class="d-flex flex-column">
                <span class="fw-bold text-dark" style="font-size: 0.85rem">{{ pelajaran.namaPelajaran }}</span>
                <span class="text-muted" style="font-size: 0.65rem; margin-top: 2px">Pengampu: {{ pelajaran.guru }}</span>
              </div>
            </div>

            <div class="d-flex flex-column align-items-end">
              <span class="text-muted mb-1" style="font-size: 0.65rem">Nilai PTS</span>
              <span class="fs-5 fw-bold" :class="pelajaran.nilai >= 75 ? 'text-dark' : 'text-danger'">
                {{ pelajaran.nilai }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "utama",
    data() {
      return {
        version: 0,

        santri: {
          nama: "Ahmad Fulan",
          kelas: "10 MIPA 1",
          waliKelas: "Ustadz Muqoddam Alam Al Hamdi",
        },

        kehadiran: {
          totalHari: 85,
          sakit: 2,
          izin: 1,
          alpha: 0,
          terlambat: 3,
        },

        nilaiPelajaran: [
          { namaPelajaran: "Matematika", guru: "Ustadz Budi", nilai: 88 },
          { namaPelajaran: "Bahasa Arab", guru: "Ustadz Hasan", nilai: 95 },
          { namaPelajaran: "Fiqih", guru: "Ustadz Ali", nilai: 90 },
          { namaPelajaran: "Sejarah Islam", guru: "Ustadz Umar", nilai: 72 },
          { namaPelajaran: "Bahasa Inggris", guru: "Mr. Smith", nilai: 85 },
        ],
      };
    },
    created() {
      this.version = process.env.version || "beta";
    },
  };
</script>

<style scoped>
  /* Gradient matching the reference design */
  .custom-gradient {
    background: linear-gradient(135deg, #00d2ff 0%, #00a8ff 100%);
  }

  /* Fallback for the custom orange color missing from standard Bootstrap alerts */
  .text-orange {
    color: #fd7e14;
  }
</style>
