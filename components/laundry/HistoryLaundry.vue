<template>
  <div class="history mt-4">
    <div class="list-container pb-5">
      <h6 class="text-uppercase text-muted small fw-bold mb-3 px-1 ls-1">Last Laundry Activity</h6>

      <div
        v-for="(data, i) in filterData"
        :key="i"
        class="transaction-item d-flex justify-content-between align-items-center py-3 border-bottom-soft">
        <div class="d-flex align-items-center">
          <div class="icon-box me-3 shadow-sm" :class="getGradientClass(data.status)">
            <i :class="getIconClass(data.status)"></i>
          </div>

          <div class="d-flex flex-column">
            <h6 class="fw-bold text-dark mb-1">Laundry {{ formDate(data.SK) }}</h6>
            <div class="d-flex align-items-center">
              <p class="text-muted mb-0 h5 me-2">{{ data.status }}</p>

              <div class="info-tooltip-wrapper">
                <i class="bi bi-info-circle text-muted small-icon"></i>
                <div class="tooltip-content shadow-lg">
                  <div class="d-flex justify-content-between mb-1">
                    <span>Items:</span>
                    <span class="fw-bold">{{ data.jumlah_laundry }} pcs</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Over limit:</span>
                    <span class="fw-bold text-warning">{{ data.jumlah_kelebihan }} pcs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-end">
          <h6 class="fw-bold mb-0" :class="getTextColor(data.status)">{{ getAmountPrefix(data.status) }} Rp {{ nominal(data.total_denda) }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState("laundry", ["laundryLog"]),
      filterData() {
        const data = this.laundryLog || [];
        const limit = this.$route.path === "/card" ? 5 : data.length;
        return data.slice(0, limit);
      },
    },

    methods: {
      getGradientClass(status) {
        switch (status) {
          case "paid":
            return "bg-gradient-success";
          case "unpaid":
            return "bg-gradient-danger";
          case "covered":
            return "bg-gradient-warning"; // New Covered Style
          default:
            return "bg-gradient-primary";
        }
      },

      getIconClass(status) {
        switch (status) {
          case "paid":
            return "bi bi-check2-circle text-white h5 mb-0";
          case "unpaid":
            return "bi bi-exclamation-circle text-white h5 mb-0";
          case "covered":
            return "bi bi-shield-check text-white h5 mb-0"; // Shield for protection/coverage
          default:
            return "bi bi-arrow-repeat text-white h5 mb-0";
        }
      },

      getTextColor(status) {
        switch (status) {
          case "paid":
            return "text-success-theme";
          case "unpaid":
            return "text-danger-theme";
          case "covered":
            return "text-warning-theme"; // New Theme Color
          default:
            return "text-dark";
        }
      },

      getAmountPrefix(status) {
        if (status === "paid") return "-";
        if (status === "unpaid") return "+";
        return "•"; // Dot for covered/neutral transactions
      },

      formDate(daTe) {
        if (!daTe) return "-";
        const dateObject = new Date(daTe);
        const options = { day: "numeric", month: "short", year: "numeric" };
        return dateObject.toLocaleDateString("id-ID", options);
      },

      nominal(a) {
        return new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 0,
        }).format(a || 0);
      },
    },
  };
</script>

<style scoped>
  .border-bottom-soft {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .transaction-item:last-child {
    border-bottom: none;
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Gradients */
  .bg-gradient-success {
    background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%);
  }
  .bg-gradient-danger {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  }
  /* NEW: Warm Gold/Orange for Covered */
  .bg-gradient-warning {
    background: linear-gradient(135deg, #f09819 0%, #edde5d 100%);
  }
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* Theme Text Colors */
  .text-success-theme {
    color: #00b09b;
  }
  .text-danger-theme {
    color: #dd2476;
  }
  .text-warning-theme {
    color: #f09819;
  }

  .ls-1 {
    letter-spacing: 1px;
  }
  h6 {
    font-size: 15px;
  }
  p {
    font-size: 12px;
  }

  /* Tooltip Container */
  .info-tooltip-wrapper {
    position: relative;
    display: inline-block;
    cursor: help;
  }

  .small-icon {
    font-size: 0.85rem;
    vertical-align: middle;
  }

  /* Tooltip Box (Hidden by default) */
  .tooltip-content {
    visibility: hidden;
    width: 160px;
    background-color: #2d3436;
    color: #fff;
    text-align: left;
    border-radius: 8px;
    padding: 10px 12px;
    position: absolute;
    z-index: 10;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 11px;
  }

  /* Tooltip Arrow */
  .tooltip-content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #2d3436 transparent transparent transparent;
  }

  /* Show on Hover */
  .info-tooltip-wrapper:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }

  /* Optional: adjust the existing h5 class if it's too big */
  .h5 {
    font-size: 12px !important;
  }
</style>
