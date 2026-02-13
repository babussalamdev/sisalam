<template>
  <div class="summary-card shadow-sm border-0 rounded-4 position-relative overflow-hidden">
    <div class="decorative-circle"></div>

    <div class="card-body p-4 position-relative z-1">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <div class="icon-box bg-danger-subtle text-danger d-flex align-items-center justify-content-center rounded-circle">
            <i class="bi bi-receipt h4 mb-0"></i>
          </div>

          <div>
            <p class="text-uppercase text-muted fw-bold mb-1 ls-1" style="font-size: 0.75rem">Total Tagihan Laundry</p>
            <h3 class="fw-bold text-danger mb-0">
              <span class="fs-6 text-muted me-1 fw-normal">Rp</span>
              {{ nominal(card.DendaLaundry) }}
            </h3>
          </div>
        </div>

        <div class="text-end" v-if="card.DendaLaundry > 0">
          <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3">Unpaid</span>
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
  .summary-card {
    background: #fff;
    /* Subtle red tint at bottom */
    background: linear-gradient(to right, #ffffff, #fff5f5);
  }

  .icon-box {
    width: 56px;
    height: 56px;
    background-color: rgba(220, 53, 69, 0.1) !important; /* Bootstrap Danger Soft */
    transition: transform 0.3s ease;
  }

  .summary-card:hover .icon-box {
    transform: scale(1.05);
  }

  .ls-1 {
    letter-spacing: 1px;
  }

  /* Decorative element */
  .decorative-circle {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(220, 53, 69, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
  }
</style>
