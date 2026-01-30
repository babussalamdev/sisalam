<template>
  <div class="history mt-4">
    <div class="list-container pb-5">
      <h6 class="text-uppercase text-muted small fw-bold mb-3 px-1 ls-1">Last Laundry Activity</h6>

      <div
        v-for="(data, i) in filterData"
        :key="i"
        class="transaction-item d-flex justify-content-between align-items-center py-3 border-bottom-soft">
        <div class="d-flex align-items-center">
          <div class="icon-box me-3 shadow-sm" :class="getGradientClass(data.GSIPK1)">
            <i :class="getIconClass(data.GSIPK1)"></i>
          </div>

          <div class="d-flex flex-column">
            <h6 class="fw-bold text-dark mb-1">
              {{ getTitle(data.GSIPK1) }}
            </h6>
            <p class="text-muted small mb-0">
              {{ formDate(data.SK) }}
              <span class="mx-1">•</span>
              {{ data.SK.split(" ")[1] }}
            </p>
          </div>
        </div>

        <div class="text-end">
          <h6 class="fw-bold mb-0" :class="getTextColor(data.GSIPK1)">{{ data.GSIPK1 === "debit" ? "+" : "-" }} Rp {{ nominal(data.Amount) }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState("index", ["cardLog"]),
      filterData() {
        const data = this.cardLog;
        const limit = this.$route.path === "/card" ? 5 : data.length;
        return data.slice(0, limit);
      },
    },

    methods: {
      // Helper to determine the gradient background based on type
      getGradientClass(type) {
        if (type === "debit") return "bg-gradient-success"; // Green
        if (type === "credit") return "bg-gradient-danger"; // Red/Pink
        return "bg-gradient-primary"; // Indigo
      },

      // Helper to determine icon class
      getIconClass(type) {
        if (type === "debit") return "bi bi-arrow-down-left-circle-fill text-white h5 mb-0"; // Arrow coming in
        if (type === "credit") return "bi bi-receipt text-white h5 mb-0"; // Receipt/Bill
        return "bi bi-arrow-repeat text-white h5 mb-0"; // Swap/Transfer
      },

      // Helper for Text Color
      getTextColor(type) {
        if (type === "debit") return "text-success-theme";
        if (type === "credit") return "text-danger-theme";
        return "text-dark";
      },

      // Helper for Title Text
      getTitle(type) {
        if (type === "debit") return "Top Up";
        if (type === "credit") return "Invoice Payment";
        return "Mutasi Kartu";
      },

      formDate(daTe) {
        const inputDate = daTe;
        const dateObject = new Date(inputDate);
        const options = { day: "numeric", month: "short", year: "numeric" }; // Changed to "short" for cleaner look
        return dateObject.toLocaleDateString("id-ID", options);
      },

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
  /* 1. CONTAINER & LAYOUT */
  .border-bottom-soft {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .transaction-item:last-child {
    border-bottom: none;
  }

  /* 2. ICON BOXES (Squircles with Gradients) */
  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 16px; /* Squircle shape */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Gradient: Success (Topup) -> Emerald to Teal */
  .bg-gradient-success {
    background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%);
  }

  /* Gradient: Danger (Tagihan) -> Berry Red (Matches your Bill Card) */
  .bg-gradient-danger {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  }

  /* Gradient: Primary (General) -> Indigo (Matches your Main Card) */
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* 3. TEXT COLORS */
  .text-success-theme {
    color: #00b09b;
  }

  .text-danger-theme {
    color: #dd2476;
  }

  /* 4. UTILITIES */
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
