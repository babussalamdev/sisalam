<template>
  <div class="container">
    <div class="all d-flex flex-column align-items-center justify-content-center">
      <img src="~/assets/image/success.png" alt="" width="200" />
      <h1 class="text-primary fw-bold mt-5">Aktivasi Berhasil!</h1>
      <p class="w-75 text-center mb-5">
        Login untuk mulai mengakses fitur fitur dari aplikasi
      </p>
      <nuxt-link to="/" class="btn btn-primary text-decoration-none py-2 px-5 mt-3">Login Sekarang</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: "verification",
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .container {
    height: 100vh;
  }

  .all {
    height: 100%;
  }
}
</style>
