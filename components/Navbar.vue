<template>
  <nav class="navbar fixed-bottom bg-white mx-auto py-2">
    <div class="container-fluid">
      <div class="menu d-flex justify-content-evenly">
        <!-- menu -->
        <nuxt-link to="/" exact active-class="linkActive" class="text-decoration-none">
          <div class="d-flex flex-column text-center">
            <div class="userprofile d-flex align-items-center justify-content-center mx-auto">
              <i class="bi bi-house-door-fill h4 fw-bold text-secondary"></i>
            </div>
            <div>
              <p class="fw-semibold text-secondary">Beranda</p>
            </div>
          </div>
        </nuxt-link>
        <!-- menu -->
        <nuxt-link to="/card" active-class="linkActive" class="text-decoration-none">
          <div class="d-flex flex-column text-center">
            <div class="userprofile d-flex align-items-center justify-content-center mx-auto">
              <i class="bi bi-credit-card h4 fw-bold text-secondary"></i>
            </div>
            <div>
              <p class="fw-semibold text-secondary">Kartu</p>
            </div>
          </div>
        </nuxt-link>
        <!-- mutabaah -->
        <nuxt-link to="/mutabaah" active-class="linkActive" class="text-decoration-none">
          <div class="d-flex flex-column text-center">
            <div class="userprofile d-flex align-items-center justify-content-center mx-auto">
              <i class="bi bi-journal-text h4 fw-bold text-secondary"></i>
            </div>
            <div>
              <p class="fw-semibold text-secondary">Mutabaah</p>
            </div>
          </div>
        </nuxt-link>
        <!-- pengaturan -->
        <nuxt-link to="/menu" active-class="linkActive" class="text-decoration-none">
          <div class="d-flex flex-column text-center">
            <div class="userprofile d-flex align-items-center justify-content-center mx-auto">
              <i class="bi bi-gear-wide-connected h4 fw-bold text-secondary"></i>
            </div>
            <div>
              <p class="fw-semibold text-secondary">Pengaturan</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.linkActive {
  position: relative;
}

.linkActive::after {
  position: absolute;
  content: "";
  top: -8px;
  height: 2px;
  width: 100%;
  background: grey;
}

.linkActive i {
  color: black !important;
}

.linkActive p {
  color: black !important;
}

.navbar {
  border-radius: 10px;
  bottom: 10px;
  width: 40%;
  box-shadow: 1px 1px 20px #7575758f;
}

.menu {
  width: 100%;
}

.userprofile {
  width: 35px;
  height: 35px;
  border-radius: 30px;
  padding-top: 5px;
}

p {
  margin-bottom: 0 !important;
  margin-top: -5px;
  font-size: 10px;
}

@media screen and (max-width: 576px) {
  .navbar {
    bottom: 0 !important;
    width: 100% !important;
    border-radius: 0 !important;
    /* border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important; */
  }
}

@media screen and (max-width: 991px) {
  .navbar {
    width: 70%;
  }
}
</style>
