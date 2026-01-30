<template>
  <div class="position-relative container-card">
    <div class="card-wallet border-0 rounded-4 p-4 mt-4 shadow-lg">
      <div class="d-flex justify-content-between align-items-start">
        <i class="bi bi-credit-card-2-back-fill h2 text-white opacity-75"></i>
        <img src="~/assets/image/logo.webp" width="40" height="40" class="img-fluid rounded-circle bg-white p-1" />
      </div>

      <div class="mt-4 mb-4">
        <p class="text-white-50 mb-0 small text-uppercase ls-1">Card Holder</p>
        <h3 class="fw-bold text-white tracking-wide text-capitalize">{{ $auth.user.name }}</h3>
      </div>

      <div class="d-flex justify-content-between align-items-end">
        <div>
          <p class="text-white-50 mb-0 small text-uppercase ls-1">Total Balance</p>
          <h2 class="fw-bold text-white mb-0">Rp {{ $auth.user.cnc !== "-" ? nominal(card?.Balance) : "-" }}</h2>
        </div>
      </div>
    </div>

    <div class="fake-card rounded-4"></div>

    <div v-if="card?.Status === 'blokir'" class="mt-3">
      <div class="alert alert-danger border-0 rounded-4 d-flex align-items-center shadow-sm" role="alert">
        <i class="bi bi-exclamation-circle-fill me-3 h4 mb-0"></i>
        <div class="small">
          Kartu Anda diblokir.
          <NuxtLink to="/menukartu/blokirkartu" class="fw-bold text-danger text-decoration-underline">Aktifkan sekarang</NuxtLink>
          untuk bertransaksi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("index", ["card"]),
    },
    methods: {
      nominal(a) {
        return new Intl.NumberFormat("id-ID", {
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(a);
      },
    },
  };
</script>

<style scoped>
  /* Modern Indigo Gradient */
  .card-wallet {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    z-index: 2;
    overflow: hidden;
  }

  /* Add a subtle shine effect */
  .card-wallet::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .fake-card {
    margin: -30px auto 0;
    height: 60px;
    width: 90%;
    background: #5a54a6; /* Darker shade of theme */
    opacity: 0.6;
    z-index: 1;
    position: relative;
  }

  .ls-1 {
    letter-spacing: 1px;
    font-size: 0.75rem;
  }

  .text-white-50 {
    color: rgba(255, 255, 255, 0.65) !important;
  }
</style>
