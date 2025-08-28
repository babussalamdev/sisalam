<template>
  <div class="positon-relative">
    <div class="card border-none rounded-4 p-4 mt-4" :class="$auth.user.cnc !== '-' ? '' : 'greyscale'">
      <div class="d-flex justify-content-between">
        <i class="bi bi-credit-card-2-back-fill h2 text-white"></i>
        <img src="~/assets/image/logo.webp" width="30px" height="30px" class="img-card" />
      </div>
      <div class="mb-5">
        <h2 class="fw-semibold text-white">{{ card?.SK ? card?.SK : "-" }}</h2>
      </div>
      <div>
        <!-- <p class="text-white">{{ $store.state.card.nis }}</p> -->
        <h6 class="text-white text-capitalize">{{ $auth.user.cnc !== "-" ? $auth.user.name : "-" }}</h6>
      </div>
    </div>
    <div class="fake-card border-none rounded-4 bg-warning"></div>

    <div v-if="card?.Status === `blokir`" class="pt-3">
      <p class="p-3 bg-danger text-white rounded-4">
        Kartu anda tak bisa digunakan,
        <NuxtLink to="/menukartu/blokirkartu">aktifkan</NuxtLink>
        untuk kembali bertransaksi
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("index", ["card"]),
    },
  };
</script>

<style scoped>
  .greyscale {
    filter: grayscale(100%);
  }
  .card {
    background-image: url(~/assets/image/card.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .fake-card {
    margin: -39px auto 0;
    height: 50px;
    width: 90%;
    z-index: -2;
  }

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 12px;
  }

  h6 {
    margin-top: -7px;
    font-size: 14px;
  }
</style>
