<template>
  <section>
    <div class="container">
      <div class="total-wrapper mb-4 d-flex flex-column justify-content-center align-items-center">
        <p class="py-1 px-2 bg-secondary-subtle rounded-3"> <i class="bi bi-book me-1"></i> Total Hafalan</p>
        <h1 class="fw-bold">5.6 Juz</h1>
        <h6>612 halaman</h6>
      </div>
      <!-- widgets -->
      <div class="widgets mb-4">
        <!-- <div class="card p-3 bg-light border-0 shadow-sm rounded-4">
        <p class="mb-2"><i class="bi bi-exclamation-circle me-1"></i>Status Asrama</p>
        <h1 class="mb-1 text-capitalize">{{ this.$auth.user.Logs?.asrama?.status }}<i class="material-icons ms-1">
            school </i></h1>
        <h6 class="text-secondary mb-3">{{ formatDate(this.$auth.user.Logs?.asrama?.time) }}</h6>
        <div class="line-bottom bg-success rounded-5"></div>
      </div> -->
        <div class="card p-3 bg-light border-0 shadow-sm rounded-4">
          <p class="mb-2"><i class="bi bi-book me-2"></i>Hafalan Awal</p>
          <h1 class="mb-1" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">الكهف</h1>
          <h6 class="text-secondary mb-3">Ayat 1 - 20</h6>
          <p class="mb-0">29 September 2024</p>
          <!-- <div class="line-bottom bg-success rounded-5"></div> -->
        </div>
        <div class="card p-3 bg-light border-0 shadow-sm rounded-4">
          <p class="mb-2"><i class="bi bi-book me-2"></i>Hafalan Terakhir</p>
          <h1 class="mb-1" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">الكهف</h1>
          <h6 class="text-secondary mb-3">Ayat 40 - 65</h6>
          <p class="mb-0">31 September 2024</p>
          <!-- <div class="line-bottom bg-success rounded-5"></div> -->
        </div>
        <!-- <div class="card p-3 bg-danger-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2"><i class="bi bi-exclamation-triangle me-1"></i>Riwayat Pelanggaran</p>
        <h1 class="mb-1">25 Poin</h1>
        <h6 class="text-secondary mb-3">Total 6 Pelanggaran</h6>
        <p class="mb-0">29 September 2024</p>
      </div> -->
      </div>

      <!-- history -->
      <div class="history">
        <p class="mb-3" style="font-size: 10px;">Riwayat Ziyadah</p>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-2 bg-light p-2 border-0 rounded-4">
          <div class="list-history p-1 d-flex justify-content-between">
            <div class="info d-flex gap-2">
              <div class="icon py-1 px-2 bg-primary-subtle rounded-circle">
                <i class="bi bi-info"></i>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-0">Ayat 1</p>
                <p class="mb-0">Halaman 293</p>
              </div>
            </div>
            <div class="from d-flex gap-1 align-items-center">
              <div class="d-flex align-items-center">
                <h1 class="mb-0">الكهف - الكهف</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import 'moment/locale/id'; // Import locale for Indonesian
export default {
  layout: "utama",
  methods: {
    formatDate(dateString) {
      // Set the locale and format the date
      moment.locale('id');
      return moment(dateString).format('DD MMMM YYYY');
    }
  },
}
</script>

<style scoped>
section {
  font-family: 'Poppins', sans-serif;
}

.total-wrapper p {
  font-size: 10px;
}

.total-wrapper h1 {
  font-size: 32px;
}

.total-wrapper h6 {
  font-size: 12px;
}

.widgets {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.widgets p {
  font-size: 10px;
}

.widgets h1 {
  font-size: 20px;
}

.widgets h6 {
  font-size: 10px;
}

.widgets .line-bottom {
  height: 5px;
  width: 60px;
}

.history h1 {
  font-family: 'Noto Kufi Arabic', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.history p {
  font-size: 10px;
}
</style>
