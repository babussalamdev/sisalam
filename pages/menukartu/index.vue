<template>
  <section id="menu">
    <div class="media mx-auto">
      <div class="container pb-5">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/menu">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Kartu</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm my-4">
          <!-- list menu -->
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-unlock mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Ganti PIN</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/menukartu/gantipin">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-credit-card-2-front mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Tukar Kartu</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/menukartu/gantikartu">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
          <!-- blokir Kartu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-credit-card-2-front mt-1 text-white h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Blokir Kartu</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/menukartu/blokirkartu">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "utama",
  middleware({ $auth, redirect }) {
    if ( $auth.user.cnc === '-') {
      return redirect('/card')
    }
  },
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
</style>
