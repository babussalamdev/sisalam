<template>
  <div class="position-relative container-card px-2">
    <div class="card-wallet border-0 rounded-4 p-4 shadow-lg position-relative overflow-hidden" :class="$auth.user.cnc === '-' ? 'greyscale' : ''">
      <div class="card-shine"></div>

      <div class="d-flex justify-content-between align-items-start mb-4 position-relative z-2">
        <div class="chip-sim">
          <div class="chip-line"></div>
          <div class="chip-line"></div>
          <div class="chip-line"></div>
          <div class="chip-line"></div>
        </div>
        <div class="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center shadow-sm" style="width: 42px; height: 42px">
          <img src="~/assets/image/logo.webp" class="img-fluid" alt="Logo" />
        </div>
      </div>

      <div class="mb-4 position-relative z-2">
        <p class="text-white-50 mb-1 small text-uppercase ls-2 fw-bold" style="font-size: 10px">Card Number</p>
        <h4 class="fw-bold text-white tracking-wide mb-0">
          {{ card?.SK ? card?.SK : "-" }}
        </h4>
      </div>

      <div class="d-flex justify-content-between align-items-end position-relative z-2">
        <div>
          <p class="text-white-50 mb-0 small text-uppercase ls-2 fw-bold" style="font-size: 10px">Card Holder</p>
          <h6 class="text-white text-capitalize mb-0 fw-semibold">
            {{ $auth.user.cnc !== "-" ? $auth.user.name : "-" }}
          </h6>
        </div>
        <div class="text-end">
          <p class="text-white-50 mb-0 small text-uppercase ls-2 fw-bold" style="font-size: 10px">Balance</p>
          <h5 class="fw-bold text-white mb-0">
            <span class="fs-6 fw-normal opacity-75">Rp</span>
            {{ $auth.user.cnc !== "-" ? nominal(card?.Balance) : "-" }}
          </h5>
        </div>
      </div>
    </div>

    <div class="fake-card rounded-4 mx-auto"></div>

    <div v-if="card?.Status === 'blokir'" class="mt-3 px-2">
      <div class="alert alert-danger border-0 rounded-4 d-flex align-items-center shadow-sm py-3" role="alert">
        <div
          class="icon-circle bg-danger text-white me-3 d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          style="width: 40px; height: 40px">
          <i class="bi bi-lock-fill"></i>
        </div>
        <div class="small lh-sm text-dark">
          <span class="fw-bold d-block">Kartu Terblokir</span>
          <span class="text-muted" style="font-size: 11px">Aktifkan kembali untuk bertransaksi.</span>
          <NuxtLink to="/menukartu/blokirkartu" class="d-block mt-1 fw-bold text-danger text-decoration-none">
            Buka Blokir
            <i class="bi bi-arrow-right-short"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("laundry", ["card"]),
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
  .greyscale {
    filter: grayscale(100%);
    opacity: 0.8;
  }

  .card-wallet {
    /* Using the modern gradient instead of the background image */
    background: linear-gradient(135deg, #66a6ea 0%, #4b55a2 100%);
    min-height: 200px;
    z-index: 10;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }

  .chip-sim {
    width: 45px;
    height: 32px;
    background: linear-gradient(135deg, #fce38a 0%, #f38181 100%);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .chip-line {
    position: absolute;
    background: rgba(0, 0, 0, 0.15);
  }

  .chip-line:nth-child(1) {
    width: 100%;
    height: 1px;
    top: 10px;
  }
  .chip-line:nth-child(2) {
    width: 100%;
    height: 1px;
    top: 21px;
  }
  .chip-line:nth-child(3) {
    width: 1px;
    height: 100%;
    left: 14px;
  }
  .chip-line:nth-child(4) {
    width: 1px;
    height: 100%;
    left: 30px;
  }

  .fake-card {
    height: 20px;
    width: 90%;
    background: #4b55a2;
    margin-top: -12px;
    opacity: 0.3;
    z-index: 1;
    position: relative;
  }

  .ls-2 {
    letter-spacing: 2px;
  }
  .z-2 {
    z-index: 2;
  }
</style>
