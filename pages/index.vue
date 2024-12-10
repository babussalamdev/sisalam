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
        <small class="fw-bold">{{ version }}</small>
      </div>
    </div>

    <Widgets />
    <section id="kaldik">
      <div class="kaldik px-3 pt-1 pb-5">
        <Calendar :transformedData="transformedData" />
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/id'; // Import locale for Indonesian
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters("dashboard", ["getKaldik"]),
    transformedData: {
      get() {
        return this.getKaldik;
      },
    },
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
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
  font-family: 'Poppins', sans-serif;
  padding-bottom: 30px;
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

#kaldik {
  height: -moz-min-content;
  height: min-content;
}

#kaldik .calendar {
  font-size: 14px !important;
}

@media screen and (max-width: 576px) {
  #kaldik .calendar {
    font-size: 12px !important;
  }
}

/*# sourceMappingURL=kladik.css.map */
</style>
