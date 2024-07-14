<template>
  <section id="menu">
    <div class="media mx-auto">
      <div class="container pb-5">
        <!-- Judul -->
        <div class="d-flex justify-content-center">
          <h4>Menu</h4>
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm my-4">
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-person mt-1 text-white h3"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Profil</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/profil">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
          <!-- list menu -->
          <div v-if="$auth.user.cnc !== '-'" class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-postcard-fill mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Kartu</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/menukartu">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-question-circle mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>FAQ</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/FAQ">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-box-arrow-left mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Logout</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <a @click="logout">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </a>
            </div>
          </div>
          <!-- list menu -->
          <!-- <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-unlock mt-1 text-primary h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Ganti PIN</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/gantipin">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div> -->
          <!-- list menu -->
          <!-- <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-credit-card-2-front mt-1 text-primary h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Tukar Kartu</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/gantikartu">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div> -->
          <!-- blokir Kartu -->
          <!-- <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-credit-card-2-front mt-1 text-primary h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Blokir Kartu</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/blokirkartu">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div> -->
        </div>
        <!-- menu -->
        <!-- <div class="p-4 rounded-4 shadow-sm mb-5">

        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "utama",
  methods: {
    logout() {
      this.$cookies.remove("AccessToken");
      this.$auth.logout()
    },
  },
};
</script>

<style scoped>
/* all */
#menu {
  /* padding-top: 20px; */
}

.fake-image {
  opacity: 0;
}

/* menu */
.historylist {
  width: 40px;
  height: 40px;
  border-radius: 30px;
  padding-top: 5px;
}

h5 {
  margin-bottom: 0 !important;
  font-size: 16px;
}

.media {
  width: 40%;
}

@media screen and (max-width: 576px) {
  .media {
    width: 100% !important;
  }
}

/* tablet */
@media screen and (max-width: 991px) {
  .media {
    width: 70%;
  }
}
</style>
