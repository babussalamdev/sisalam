<template>
  <div class="card-bill border-0 rounded-4 shadow-lg p-4 my-4 position-relative overflow-hidden mb-4">
    <div class="decorative-circle"></div>

    <div class="d-flex align-items-center position-relative z-2">
      <div class="icon-box d-flex align-items-center justify-content-center me-3 rounded-circle shadow-sm">
        <i class="bi bi-receipt text-danger-theme h4 mb-0"></i>
      </div>

      <div class="flex-grow-1">
        <p class="text-white-50 mb-0 small text-uppercase fw-bold ls-1">Total Tagihan Laundry</p>
        <h2 class="fw-bold text-white mb-0">
          <span class="fs-6 fw-normal opacity-75">Rp</span>
          {{ nominal(card.DendaLaundry) }}
        </h2>
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
  /* MATCHING HOME PAGE THEME */
  .card-bill {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
    color: white;
    transition: transform 0.3s ease;
  }

  /* Subtle hover effect */
  .card-bill:hover {
    transform: translateY(-2px);
  }

  .icon-box {
    width: 52px;
    height: 52px;
    background-color: rgba(255, 255, 255, 0.95);
    min-width: 52px;
  }

  .text-danger-theme {
    color: #dd2476;
  }

  .text-white-50 {
    color: rgba(255, 255, 255, 0.75) !important;
  }

  .ls-1 {
    letter-spacing: 1px;
    font-size: 0.7rem;
  }

  .decorative-circle {
    position: absolute;
    top: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    z-index: 1;
  }

  .z-2 {
    z-index: 2;
  }
</style>
