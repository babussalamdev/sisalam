<template>
  <div class="history-list pb-5">
    <div
      v-for="(data, i) in filterData"
      :key="i"
      class="transaction-card d-flex justify-content-between align-items-center p-3 mb-3 bg-white rounded-4 shadow-sm border-0">
      <div class="d-flex align-items-center">
        <div class="icon-box me-3 shadow-sm" :class="getGradientClass(data.GSIPK1)">
          <i :class="`bi ${getIconClass(data)} text-white h5 mb-0`"></i>
        </div>

        <div class="d-flex flex-column">
          <h6 class="fw-bold text-dark mb-1" style="font-size: 0.95rem">
            {{ getTransactionTitle(data) }}
          </h6>

          <div class="d-flex align-items-center mt-1">
            <span class="badge rounded-pill me-2 fw-normal" :class="getBadgeClass(data.GSIPK1)">
              {{ data.GSIPK1 === "debit" ? "Top Up" : "Payment" }}
            </span>
            <span class="text-muted" style="font-size: 11px">{{ formDate(data.SK) }} • {{ data.SK.split(" ")[1] }}</span>
          </div>
        </div>
      </div>

      <div class="text-end">
        <h6 class="fw-bold mb-0" :class="getTextColor(data.GSIPK1)">{{ data.GSIPK1 === "debit" ? "+" : "-" }} Rp {{ nominal(data.Amount) }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      // Keeping your original Vuex connection
      ...mapState("index", ["cardLog"]),
      filterData() {
        const data = this.cardLog || [];
        const limit = this.$route.path === "/card" ? 5 : data.length;
        return data.slice(0, limit);
      },
    },

    methods: {
      // --- 1. Original Data Logic ---
      getIconClass(data) {
        if (data.GSIPK1 === "debit") return "bi-coin";
        if (data.GSIPK1 === "credit") {
          const invoice = data.Invoice ? data.Invoice.toLowerCase() : "";
          if (invoice.startsWith("lny")) return "bi-basket";
          return "bi-shop";
        }
        return "bi-credit-card-2-front";
      },

      getTransactionTitle(data) {
        if (data.GSIPK1 === "debit") return "Topup";
        if (data.GSIPK1 === "credit") {
          const invoice = data.Invoice ? data.Invoice.toLowerCase() : "";
          if (invoice.startsWith("inv")) return "Invoice Transaksi Market";
          if (invoice.startsWith("lny")) return "Invoice Transaksi Laundry";
          return "Invoice Transaksi";
        }
        return "Mutasi Kartu";
      },

      formDate(daTe) {
        if (!daTe) return "-";
        const dateObject = new Date(daTe);
        // Using 'short' month looks much cleaner in UI lists
        const options = { day: "numeric", month: "short", year: "numeric" };
        return dateObject.toLocaleDateString("id-ID", options);
      },

      nominal(a) {
        return new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 0,
        }).format(a || 0);
      },

      // --- 2. New UI/Design Helpers ---
      getGradientClass(type) {
        if (type === "debit") return "bg-gradient-success";
        if (type === "credit") return "bg-gradient-danger";
        return "bg-gradient-primary";
      },

      getBadgeClass(type) {
        if (type === "debit") return "bg-success-subtle text-success";
        if (type === "credit") return "bg-danger-subtle text-danger";
        return "bg-light text-dark";
      },

      getTextColor(type) {
        if (type === "debit") return "text-success-theme";
        if (type === "credit") return "text-danger-theme";
        return "text-dark";
      },
    },
  };
</script>

<style scoped>
  /* CARD STYLE LIST ITEMS */
  .transaction-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .transaction-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
  }

  /* Badge Colors */
  .bg-success-subtle {
    background-color: #d1e7dd;
    color: #0f5132;
  }
  .bg-danger-subtle {
    background-color: #f8d7da;
    color: #842029;
  }

  /* Icons container (Squircle) */
  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Gradient Backgrounds */
  .bg-gradient-success {
    background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%);
  }
  .bg-gradient-danger {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  }
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* Text Colors */
  .text-success-theme {
    color: #00b09b;
  }
  .text-danger-theme {
    color: #dd2476;
  }

  .ls-1 {
    letter-spacing: 1px;
  }
</style>
