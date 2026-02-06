<template>
  <div class="card-bill border-0 rounded-4 mt-3 shadow p-4 position-relative overflow-hidden" :class="$auth.user.cnc !== '-' ? '' : 'greyscale'">
    <div class="d-flex align-items-center position-relative z-2">
      <div class="icon-box d-flex align-items-center justify-content-center me-3 rounded-circle shadow-sm">
        <i class="bi bi-receipt text-danger-theme h4 mb-0"></i>
      </div>

      <div class="flex-grow-1">
        <p class="text-white-50 mb-0 small text-uppercase fw-bold ls-1">Total Tagihan</p>
        <h3 class="fw-bold text-white mb-0">Rp {{ $auth.user.cnc !== "-" ? nominal(card?.DendaLaundry) : "-" }}</h3>
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
  /* THEME GRADIENT:
     Starts Red/Orange (Attention) -> Ends Magenta (Matches the Purple/Indigo theme) 
  */
  .card-bill {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
    color: white;
  }

  .greyscale {
    filter: grayscale(100%);
    opacity: 0.6;
  }

  .icon-box {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.95);
    min-width: 50px; /* Prevents shrinking on small screens */
  }

  /* Color the icon to match the card background for continuity */
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

  /* Decorative circle to add texture like the main card */
  .decorative-circle {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 1;
  }

  .z-2 {
    z-index: 2;
  }
</style>
