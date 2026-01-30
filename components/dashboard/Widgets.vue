<template>
  <div>
    <div class="p-3 widgets">
      <div class="card p-3 bg-light border-0 shadow-sm rounded-4">
        <p class="mb-2">
          <i class="bi bi-exclamation-circle me-1"></i>
          Status Asrama
        </p>
        <h1 class="mb-1 text-capitalize">
          {{ absensi?.status }}
          <i class="material-icons ms-1">school</i>
        </h1>
        <h6 class="text-secondary mb-3">{{ changeDate(absensi?.time?.split(" ")[0]) }}</h6>
        <div class="line-bottom bg-success rounded-5"></div>
      </div>
      <div class="card p-3 bg-info-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2">
          <i class="bi bi-book me-1"></i>
          Hafalan Terakhir
        </p>
        <h1 class="mb-1" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">{{ ziyadah?.name }}</h1>
        <h6 class="text-secondary mb-3">Ayat {{ ziyadah?.number }}</h6>
        <p class="mb-0">{{ ziyadah.time !== "-" ? changeDate(ziyadah?.time?.split(" ")[0]) : "-" }}</p>
      </div>
      <div class="card p-3 bg-danger-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2">
          <i class="bi bi-exclamation-triangle me-1"></i>
          Riwayat Pelanggaran
        </p>
        <h1 class="mb-1">{{ pelanggaran?.Poin ? pelanggaran?.Poin : 0 }} Poin</h1>
        <h6 class="text-secondary mb-3">Total {{ pelanggaran?.Pelanggaran ? pelanggaran?.Pelanggaran : 0 }} Pelanggaran</h6>
        <p class="mb-0">{{ pelanggaran.time !== "-" ? changeDate(pelanggaran?.time?.split(" ")[0]) : "-" }}</p>
      </div>
      <div class="card p-3 bg-success-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2">
          <i class="bi bi-droplet-fill me-1"></i>
          Tagihan Laundry
        </p>
        <h1 class="mb-1">{{ rupiah(50000) }}</h1>
        <h6 class="text-secondary mb-3">Total 25 Pakaian</h6>
        <p class="mb-0">{{ pelanggaran.time !== "-" ? changeDate(pelanggaran?.time?.split(" ")[0]) : "-" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import "moment/locale/id";
  import formatSet from "~/mixins/formatSet";
  import { mapState } from "vuex";
  export default {
    mixins: [formatSet],
    computed: {
      ...mapState("dashboard", ["pelanggaran", "absensi", "ziyadah"]),
    },
    methods: {
      formatDate(dateString) {
        moment.locale("id");
        return moment(dateString).format("DD MMMM YYYY");
      },
      changeDate(dateString) {
        if (dateString) {
          const date = new Date(dateString);

          const options = { day: "numeric", month: "long", year: "numeric" };
          const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

          return formattedDate;
        } else {
          return "-";
        }
      },
    },
  };
</script>

<style scoped></style>
