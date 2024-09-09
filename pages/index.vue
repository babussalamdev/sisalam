<template>
  <div class="home">
    <div class="profile-wrapper d-flex justify-content-between p-3 align-items-center">
      <div class="profile d-flex gap-3 align-items-center">
        <div class="profile-image">
          <img src="~/assets/image/pp-1.png" alt="">
        </div>
        <div class="profile-text">
          <p class="mb-0">Hello!</p>
          <h6 class="mb-0 text-capitalize">{{ this.$auth.user.name }}</h6>
        </div>
      </div>
      <div class="notification">
        <a href="javascript:;" class="text-dark">
          <i class="bi bi-bell-fill fs-5"></i>
        </a>
        <div class="notifications-circle"></div>
      </div>
    </div>

    <!-- widgets -->
    <div class="p-3 widgets">
      <div class="card p-3 bg-light border-0 shadow-sm rounded-4">
        <p class="mb-2"><i class="bi bi-exclamation-circle me-1"></i>Status Asrama</p>
        <h1 class="mb-1 text-capitalize">{{ this.$auth.user.Logs?.asrama?.status }}<i class="material-icons ms-1">
            school </i></h1>
        <h6 class="text-secondary mb-3">{{ formatDate(this.$auth.user.Logs?.asrama?.time) }}</h6>
        <div class="line-bottom bg-success rounded-5"></div>
      </div>
      <div class="card p-3 bg-info-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2"><i class="bi bi-book me-1"></i>Hafalan Terakhir</p>
        <h1 class="mb-1" style="font-family: 'Noto Kufi Arabic', sans-serif; font-weight: 600">الكهف</h1>
        <h6 class="text-secondary mb-3">Ayat 1 - 20</h6>
        <p class="mb-0">29 September 2024</p>
        <!-- <div class="line-bottom bg-success rounded-5"></div> -->
      </div>
      <div class="card p-3 bg-danger-subtle border-0 shadow-sm rounded-4">
        <p class="mb-2"><i class="bi bi-exclamation-triangle me-1"></i>Riwayat Pelanggaran</p>
        <h1 class="mb-1">25 Poin</h1>
        <h6 class="text-secondary mb-3">Total 6 Pelanggaran</h6>
        <p class="mb-0">29 September 2024</p>
      </div>
    </div>

    <!-- <div class="text-center">
      <h3>
        Selamat Datang <b class="text-capitalize">{{ $auth.user.name }}</b> di Aplikasi Santri Babussalam
      </h3>
      <p class="mb-4">Halaman saat ini sedang dalam pengembangan, silahkan pergi ke halaman <b>Kartu</b> melalui navigasi di bawah</p>
      <p>ver {{ version}}</p>
    </div> -->
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/id'; // Import locale for Indonesian
export default {
  layout: "utama",
  data() {
    return {
      version: 0
    }
  },
  async asyncData({ store }) {
    store.dispatch(`kaldik/changeUnit`);
  },
  created() {
    this.version = process.env.version;
  },
  methods: {
    formatDate(dateString) {
      // Set the locale and format the date
      moment.locale('id');
      return moment(dateString).format('DD MMMM YYYY');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.home {
  /* height: 100vh;
  display: flex;
  align-items: center; */
  font-family: 'Poppins', sans-serif
}

/* .text-center {
  width: 340px;
  margin-inline: auto;
} */
.profile-wrapper p {
  font-size: 12px;
}

.notification {
  position: relative;
}

.notifications-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  right: 0;
  border-radius: 50%;
  background: red;
}

.widgets {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
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
</style>
