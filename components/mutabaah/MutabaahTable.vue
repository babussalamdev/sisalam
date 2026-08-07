<template>
  <div class="pb-5">
    <div class="container mt-3">
      <!-- Subject Options -->
      <div class="d-flex overflow-auto gap-2 mb-4 hide-scrollbar">
        <button
          v-for="item in subjectOptions"
          :key="item.value"
          @click="updateSubject(item.value)"
          class="btn rounded-pill px-4 fw-medium shadow-sm transition-all"
          :class="selectedSubject === item.value ? 'btn-primary text-white' : 'btn-light text-secondary border'"
          style="white-space: nowrap">
          {{ item.label }}
        </button>
      </div>

      <!-- NEW: Informasi Halaqah & Pengampu -->
      <div class="card mb-4 bg-white border-0 shadow-sm rounded-4 p-3" v-if="datas.halaqah || datas.pegawai">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
            style="width: 48px; height: 48px; min-width: 48px">
            <i class="bi bi-people-fill fs-5"></i>
          </div>
          <div>
            <h6 class="mb-1 fw-bold text-dark" style="font-size: 0.95rem">Nama halaqah : {{ datas.halaqah || "-" }}</h6>
            <p class="mb-0 text-secondary" style="font-size: 0.85rem">
              Pengampu:
              <span class="text-dark fw-medium">Ustadz {{ datas.pegawai || "-" }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Total Wrapper -->
      <div
        class="total-wrapper mb-4 p-4 rounded-4 shadow-sm text-white text-center"
        style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
        <span class="badge bg-white text-primary mb-2 px-3 py-2 rounded-pill shadow-sm">
          <i class="bi bi-book me-1"></i>
          Total {{ getSubjectLabel(selectedSubject) }}
        </span>
        <h1 class="fw-bold mb-1" style="font-size: 2.5rem">
          <!-- If user has at least 1 Khatam -->
          <template v-if="datas.khatam > 0">
            {{ datas.khatam }}x Khatam
            <br />
            <span style="font-size: 1.5rem">dan {{ datas.remainingJuz }} Juz</span>
          </template>

          <!-- If user hasn't reached 1 Khatam yet -->
          <template v-else>{{ datas.Juz || 0 }} Juz</template>
        </h1>
        <h6 class="opacity-75 mb-0">{{ datas.totalPages || 0 }} halaman</h6>
      </div>

      <!-- Awal & Terakhir -->
      <div class="row g-3 mb-4">
        <div class="col-6">
          <div class="card p-3 h-100 bg-white border-0 shadow-sm rounded-4">
            <p class="mb-2 text-secondary" style="font-size: 0.85rem">
              <i class="bi bi-journal-arrow-up me-1"></i>
              Awal
            </p>
            <h4 class="mb-1 text-truncate" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">
              {{ datas?.oldestFrom?.From?.name || "-" }}
            </h4>
            <p class="text-secondary mb-2" style="font-size: 0.8rem">Ayat {{ datas?.oldestFrom?.From?.ayat?.number || "-" }}</p>
            <p class="mb-0 text-muted" style="font-size: 0.75rem">{{ changeDate(datas?.oldestFrom?.SK?.split(" ")[0]) }}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="card p-3 h-100 bg-white border-0 shadow-sm rounded-4">
            <p class="mb-2 text-secondary" style="font-size: 0.85rem">
              <i class="bi bi-journal-arrow-down me-1"></i>
              Terakhir
            </p>
            <h4 class="mb-1 text-truncate" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">
              {{ datas?.earliestTo?.To?.name || "-" }}
            </h4>
            <p class="text-secondary mb-2" style="font-size: 0.8rem">Ayat {{ datas?.earliestTo?.To?.ayat?.number || "-" }}</p>
            <p class="mb-0 text-muted" style="font-size: 0.75rem">{{ changeDate(datas?.earliestTo?.SK?.split(" ")[0]) }}</p>
          </div>
        </div>
      </div>

      <!-- History / Riwayat -->
      <div class="history mb-5 pb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0 fw-bold">Riwayat {{ getSubjectLabel(selectedSubject) }}</h6>
          <span class="badge bg-light text-secondary rounded-pill border">{{ datas?.hafalan?.length || 0 }} Aktivitas</span>
        </div>

        <div v-if="!datas?.hafalan?.length" class="text-center text-muted py-4">
          <i class="bi bi-inbox fs-1"></i>
          <p class="mt-2">Belum ada riwayat {{ getSubjectLabel(selectedSubject).toLowerCase() }}.</p>
        </div>

        <div v-for="(data, index) in datas?.hafalan" :key="index" class="card mb-3 bg-white p-3 border-0 shadow-sm rounded-4">
          <div class="d-flex align-items-center gap-3">
            <div
              class="icon d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle"
              style="width: 48px; height: 48px; min-width: 48px">
              <i class="bi bi-book-half fs-5"></i>
            </div>

            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0 fw-bold" style="font-family: 'Noto Kufi Arabic', sans-serif">{{ data.From.name }} - {{ data.To.name }}</h6>
                <small class="text-muted">{{ data.SK.slice(11, 16) }}</small>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-secondary" style="font-size: 0.85rem">Ayat {{ data.From.ayat.number }} - {{ data.To.ayat.number }}</span>
                <span class="badge bg-light text-dark rounded-pill border">{{ data.Page }} Halaman</span>
              </div>
            </div>
          </div>
          <hr class="my-2 text-muted" style="opacity: 0.1" />
          <div class="text-end">
            <small class="text-muted">{{ changeDate(data.SK.split(" ")[0]) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import "moment/locale/id";
  import { mapState, mapActions } from "vuex";

  export default {
    // Add data to hold our label mappings
    data() {
      return {
        subjectOptions: [
          { value: "ziyadah", label: "Hafalan Baru" },
          { value: "tilawah", label: "Tilawah" },
          { value: "murojaah", label: "Murojaah" },
          { value: "tahsin", label: "Tahsin" },
        ],
      };
    },
    computed: {
      ...mapState("mutabaah", ["datas", "selectedSubject"]),
    },
    mounted() {
      this.fetchMutabaah();
    },
    methods: {
      ...mapActions("mutabaah", ["fetchMutabaah", "changeSubject"]),

      updateSubject(type) {
        if (this.selectedSubject !== type) {
          this.changeSubject(type);
        }
      },

      // New helper method to get the correct UI label
      getSubjectLabel(value) {
        const option = this.subjectOptions.find((opt) => opt.value === value);
        return option ? option.label : "";
      },

      formatDate(dateString) {
        moment.locale("id");
        return moment(dateString).format("DD MMMM YYYY");
      },

      changeDate(dateString) {
        if (dateString) {
          const date = new Date(dateString);
          const options = { day: "numeric", month: "long", year: "numeric" };
          return new Intl.DateTimeFormat("id-ID", options).format(date);
        }
        return "-";
      },
    },
  };
</script>

<style scoped>
  /* Hide scrollbar for the horizontal tab menu but keep it scrollable */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .transition-all {
    transition: all 0.2s ease-in-out;
  }
</style>
