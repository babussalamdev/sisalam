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
          <h1 class="mx-auto mt-3">Muhammad Fauzan Gunawan</h1>
          <h6 class="fw-light">001.0920.001</h6>
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm my-4">
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div
                class="historylist d-flex align-items-center justify-content-center me-3"
              >
                <i class="bi bi-person mt-1 text-primary h3"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Card Number</p>
                <h5>7276061739</h5>
              </div>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div
                class="historylist d-flex align-items-center justify-content-center me-3"
              >
                <i class="bi bi-person mt-1 text-primary h3"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Status</p>
                <h5>Santri Aktif</h5>
              </div>
            </div>
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div
                class="historylist d-flex align-items-center justify-content-center me-3"
              >
                <i class="bi bi-person mt-1 text-primary h3"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <p class="text-secondary">Pondok</p>
                <h5>Babussalam Pondok</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- menu -->
        <div class="p-4 rounded-4 shadow-sm">
          <!-- list menu -->
          <div class="d-flex justify-content-between mb-4">
            <div class="d-flex">
              <div
                class="historylist d-flex align-items-center justify-content-center me-3"
              >
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
          </div>
          <!-- list menu -->
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div
                class="historylist d-flex align-items-center justify-content-center me-3"
              >
                <i class="bi bi-box-arrow-left mt-1 text-primary h4"></i>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h5>Logout</h5>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <nuxt-link to="/">
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
export default {};
</script>

<style scoped>
/* all */
#menu {
  padding-bottom: 100px;
  padding-top: 20px;
}
.fake-image {
  opacity: 0;
}

/* menu */
.historylist {
  width: 40px;
  height: 40px;
  background-color: rgb(216, 236, 255);
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
