<template>
  <div class="list pb-5">
    <div
      v-for="(data, i) in filterData"
      :key="i"
      class="transaction-card d-flex justify-content-between align-items-center p-3 mb-2 rounded-4 bg-white shadow-sm border-0">
      <div class="d-flex align-items-center">
        <div class="icon-box me-3 shadow-sm" :class="getGradientClass(data.status)">
          <i :class="getIconClass(data.status)"></i>
        </div>

        <div class="d-flex flex-column">
          <h6 class="fw-bold text-dark mb-1">Laundry {{ formDate(data.SK) }}</h6>

          <div class="d-flex align-items-center mt-1">
            <span class="badge rounded-pill me-2 fw-normal" :class="getBadgeClass(data.status)">
              {{ data.status }}
            </span>

            <div class="info-tooltip-wrapper">
              <i class="bi bi-info-circle-fill text-muted small-icon opacity-50"></i>
              <div class="tooltip-content shadow-lg">
                <div class="d-flex justify-content-between mb-1">
                  <span>Items:</span>
                  <span class="fw-bold text-white">{{ data.jumlah_laundry }} pcs</span>
                </div>
                <div class="d-flex justify-content-between" v-if="data.jumlah_kelebihan > 0">
                  <span>Over limit:</span>
                  <span class="fw-bold text-warning">+{{ data.jumlah_kelebihan }}</span>
                </div>
                <div class="d-flex justify-content-between" v-else>
                  <span>Over limit:</span>
                  <span class="fw-bold text-success">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-end">
        <h6 class="fw-bolder mb-0 fs-6" :class="getTextColor(data.status)">{{ getAmountPrefix(data.status) }} Rp {{ nominal(data.total_denda) }}</h6>
        <small class="text-muted" style="font-size: 10px">Total Bill</small>
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
        const limit = this.$route.path === "/laundry" ? 5 : data.length;
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
            return "bg-gradient-warning";
          default:
            return "bg-gradient-primary";
        }
      },
      getBadgeClass(status) {
        switch (status) {
          case "paid":
            return "bg-success-subtle text-success";
          case "unpaid":
            return "bg-danger-subtle text-danger";
          case "covered":
            return "bg-warning-subtle text-warning";
          default:
            return "bg-secondary-subtle text-dark";
        }
      },
      getIconClass(status) {
        switch (status) {
          case "paid":
            return "bi bi-check-lg text-white h5 mb-0";
          case "unpaid":
            return "bi bi-exclamation-lg text-white h5 mb-0";
          case "covered":
            return "bi bi-shield-check text-white h5 mb-0";
          default:
            return "bi bi-arrow-repeat text-white h5 mb-0";
        }
      },
      getTextColor(status) {
        switch (status) {
          case "paid":
            return "text-success";
          case "unpaid":
            return "text-danger";
          case "covered":
            return "text-warning";
          default:
            return "text-dark";
        }
      },
      getAmountPrefix(status) {
        if (status === "paid") return "-";
        if (status === "unpaid") return "+";
        return "";
      },
      formDate(daTe) {
        const dateObject = new Date(daTe);
        return dateObject.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      },
      nominal(a) {
        return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(a);
      },
    },
  };
</script>

<style scoped>
  /* Floating Card Effect */
  .transaction-card {
    transition: all 0.2s ease-in-out;
    border: 1px solid rgba(0, 0, 0, 0.02) !important;
  }

  .transaction-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
  }

  /* Badge Styles (Bootstrap 5.3 mimic if not available) */
  .bg-success-subtle {
    background-color: #d1e7dd;
    color: #0f5132;
  }
  .bg-danger-subtle {
    background-color: #f8d7da;
    color: #842029;
  }
  .bg-warning-subtle {
    background-color: #fff3cd;
    color: #664d03;
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 14px; /* Slightly softer radius */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Gradients */
  .bg-gradient-success {
    background: linear-gradient(135deg, #2af598 0%, #009efd 100%);
  }
  .bg-gradient-danger {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  }
  .bg-gradient-warning {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* Tooltip Improvements */
  .info-tooltip-wrapper {
    position: relative;
    cursor: pointer;
    margin-top: 2px;
  }

  .tooltip-content {
    visibility: hidden;
    width: 140px;
    background-color: #1e1e2f; /* Darker blue-grey */
    color: #aeb4c1;
    border-radius: 6px;
    padding: 8px 10px;
    position: absolute;
    z-index: 100;
    bottom: 140%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    opacity: 0;
    transition: all 0.2s ease;
    font-size: 11px;
    pointer-events: none;
  }

  .tooltip-content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #1e1e2f transparent transparent transparent;
  }

  .info-tooltip-wrapper:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>
