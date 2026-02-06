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
            <h6 class="fw-bold text-dark mb-1">
              {{ getTitle(data.status) }}
            </h6>
            <p class="text-muted small mb-0">
              {{ formDate(data.SK) }}
              <span class="mx-1">•</span>
              {{ data.SK.split(" ")[1] }}
            </p>
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

      getTitle(status) {
        switch (status) {
          case "paid":
            return "Laundry Paid";
          case "unpaid":
            return "Laundry Bill";
          case "covered":
            return "Plan Covered"; // Professional sounding title
          default:
            return "Mutasi Kartu";
        }
      },

      getAmountPrefix(status) {
        if (status === "paid") return "+";
        if (status === "unpaid") return "-";
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
</style>
