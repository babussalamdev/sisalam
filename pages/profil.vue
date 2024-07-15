<template>
  <section id="menu">
    <div class="media mx-auto">
      <div class="container">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/menu">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>Profil</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>

        <!-- Profil -->
        <div class="text-center mt-5">
          <img src="~/assets/image/profil.png" alt="" />
          <h1 class="mx-auto mt-3">{{ $auth.user.name }}</h1>
          <h6 class="fw-light">{{ $auth.user.Nis }}</h6>
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm my-4">
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-credit-card-2-back-fill mt-1 text-white h5"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Card Number</p>
                <h5>
                  {{
                    $auth.user.cnc !== '-' ? $auth.user.cnc.split('-')[1] : '-'
                  }}
                </h5>
              </div>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-book-half mt-1 text-white h5"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Jenjang</p>
                <h5>{{ $auth.user.Program }}</h5>
              </div>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-info-circle mt-1 text-white h5"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Status</p>
                <h5>Santri Aktif</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm">
          <!-- list menu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist bg-primary d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-lock-fill mt-1 text-white h5"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Ganti Password</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/menukartu/gantipassword">
                <img src="~/assets/image/icon/Right.png" alt="" />
              </nuxt-link>
            </div>
          </div>

          <!-- list menu -->
          <!-- <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div class="historylist d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-question-circle mt-1 text-primary h4"></i>
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
          </div> -->
          <!-- list menu -->
          <!-- <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div class="historylist d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-box-arrow-left mt-1 text-primary h4"></i>
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
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    number(data) {
      data.split("-")[1];
    },
    logout() {
      localStorage.removeItem("card");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* all */
#menu {
  padding-bottom: 100px;
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
  margin-top: 4px;
  font-size: 16px;
}

h1 {
  font-size: 18px;
  width: 70%;
}

h6 {
  font-size: 12px;
}

p {
  margin-bottom: 0 !important;
  font-size: 12px;
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
