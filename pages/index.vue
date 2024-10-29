<template>
  <div class="home">
    <div class="profile-wrapper d-flex justify-content-between p-3 align-items-center">
      <div class="profile d-flex gap-1 align-items-center">
        <div class="profile-image">
          <img class="img-fluid" src="~/assets/image/main_profile.png" alt="">
        </div>
        <div class="profile-text">
          <p class="mb-0">Hello!</p>
          <h6 class="mb-0 fw-bold text-capitalize">{{ this.$auth.user.name }}</h6>
        </div>
      </div>
      <div class="notification">
        <a href="javascript:;" class="text-dark">
          <i class="bi bi-bell-fill fs-5"></i>
        </a>
        <div class="notifications-circle"></div>
      </div>
    </div>

    <Widgets />

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
    store.dispatch(`dashboard/changeUnit`);
  },
  created() {
    this.version = process.env.version;
  },
  methods: {
    formatDate(dateString) {
      moment.locale('id');
      return moment(dateString).format('DD MMMM YYYY');
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.home {
  font-family: 'Poppins', sans-serif
}

.profile-image {
  width: 45px;
  height: 45px;
}
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
