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
          <h2 class="h6 fw-bold text-dark mb-1 text-capitalize">Nama: {{ studentData ? studentData.Nama : "Memuat..." }}</h2>
          <p class="mb-0 text-muted" style="font-size: 0.75rem">
            Kelas:
            <span class="fw-semibold text-dark">{{ this.datas[0].Kelas }}</span>
          </p>
          <p class="mb-0 text-muted" style="font-size: 0.75rem">
            Wali Kelas:
            <span class="fw-semibold text-dark text-capitalize">{{ this.datas[0].WaliKelas }}</span>
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
          <h3 class="h6 fw-bold text-dark mb-0">Riwayat Nilai Tengah Semester</h3>
          <span class="badge bg-secondary bg-opacity-10 text-secondary border rounded-pill py-2 px-3" style="font-size: 0.65rem">
            {{ processedGrades.length }} Mata Pelajaran
          </span>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            v-for="(pelajaran, index) in processedGrades"
            :key="index"
            class="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center justify-content-between">
            <!-- Subject Name & Icon -->
            <div class="d-flex align-items-center gap-3">
              <!-- (Keep your existing SVG icon here) -->
              <div class="d-flex flex-column">
                <span class="fw-bold text-dark" style="font-size: 0.85rem; text-transform: capitalize">
                  {{ pelajaran.namaPelajaran }}
                </span>
                <!-- Hide Guru if not provided by backend, or map it if available later -->
                <!-- <span class="text-muted" style="font-size: 0.65rem; margin-top: 2px">KKM: {{ pelajaran.kkm }}</span> -->
              </div>
            </div>

            <!-- Grade Output with Dynamic Color -->
            <div class="d-flex flex-column align-items-end">
              <span class="text-muted mb-1" style="font-size: 0.65rem">Nilai PTS/UTS</span>
              <span class="fs-5 fw-bold" :class="pelajaran.nilai >= pelajaran.kkm ? 'text-dark' : 'text-danger'">
                {{ pelajaran.nilai }}
              </span>
            </div>
          </div>
        </div>
        <div style="height: 90px"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    layout: "utama",
    data() {
      return {
        version: 0,
        // Hardcoded attendance until you integrate the absensi backend
        kehadiran: {
          totalHari: 85,
          sakit: 2,
          izin: 1,
          alpha: 0,
          terlambat: 3,
        },
      };
    },
    created() {
      this.version = process.env.version || "beta";
    },
    async asyncData({ store }) {
      await store.dispatch("laporan/changeUnit");
    },
    computed: {
      ...mapState("laporan", ["datas"]),

      // 1. Get the first student from the backend array
      studentData() {
        if (!this.datas || !this.datas.length) return null;
        return this.datas[0];
      },

      // 2. Parse the grades dynamically
      processedGrades() {
        if (!this.studentData) return [];

        const ignoredKeys = ["Nama", "SK", "PK", "Status", "Kelas"];
        const grades = [];

        for (const [key, value] of Object.entries(this.studentData)) {
          if (!ignoredKeys.includes(key) && typeof value === "string" && value.includes("/")) {
            const [nilai, kkm] = value.split("/");
            const numericNilai = Number(nilai) || 0;

            // Optional: Skip subjects with 0 if they haven't been graded yet
            if (numericNilai > 0) {
              grades.push({
                // Convert "Bahasa_Arab" to "Bahasa Arab"
                namaPelajaran: key.replace(/_/g, " "),
                nilai: numericNilai,
                kkm: Number(kkm) || 75, // Fallback KKM
              });
            }
          }
        }

        return grades.sort((a, b) => a.namaPelajaran.localeCompare(b.namaPelajaran));
      },
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
