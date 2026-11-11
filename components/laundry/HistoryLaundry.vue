<template>
  <div class="history-list pb-5">
    <h6 class="text-uppercase text-muted small fw-bold mb-3 px-1 ls-1">Transaction History</h6>

    <div v-for="(data, i) in filterData" :key="i" class="transaction-card d-flex flex-column p-3 mb-3 bg-white rounded-4 shadow-sm border-0">
      <!-- ROW UTAMA: Icon, Info, Nominal -->
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex align-items-center">
          <div class="icon-box me-3 shadow-sm" :class="getGradientClass(data.status)">
            <i :class="getIconClass(data.status)"></i>
          </div>

          <div class="d-flex flex-column">
            <h6 class="fw-bold text-dark mb-1" style="font-size: 0.95rem">Laundry {{ formDate(data.SK) }}</h6>
            <div class="d-flex align-items-center">
              <!-- Status Badge -->
              <span class="badge rounded-pill me-2 fw-normal" :class="getBadgeClass(data.status)">
                {{ data.status }}
              </span>

              <!-- Laundry Type Badge -->
              <span v-if="data.tipe" class="badge rounded-pill bg-secondary-subtle text-secondary me-2 fw-normal" style="font-size: 0.75rem">
                {{ formatTipe(data.tipe) }}
              </span>

              <!-- Tooltip Detail -->
              <div class="info-tooltip-wrapper">
                <i class="bi bi-info-circle-fill text-muted small-icon opacity-50"></i>
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

      <!-- ROW KEDUA: Peringatan jika status unverify / unverified -->
      <div
        v-if="data.status === 'unverify' || data.status === 'unverified'"
        class="alert alert-danger mt-3 mb-0 p-2 small border-0 d-flex align-items-start w-100 rounded-3">
        <i class="bi bi-exclamation-octagon-fill text-danger me-2 mt-1"></i>
        <div style="font-size: 0.8rem; line-height: 1.4">
          Bukti bayar salah / buram. Silahkan hubungi admin Laundry Babussalam:
          <br />
          <a href="https://wa.me/6285183183208" target="_blank" class="fw-bold text-danger text-decoration-none">
            <i class="bi bi-whatsapp"></i>
            +62 851-8318-3208
          </a>
          <!-- Jika ada catatan spesifik dari backend (misal: "alasan" atau "notes") -->
          <div v-if="data.notes || data.alasan" class="mt-1 p-1 bg-white rounded border border-danger-subtle text-muted">
            <span class="fw-bold text-dark">Catatan Admin:</span>
            {{ data.notes || data.alasan }}
          </div>
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
        return this.laundryLog || [];
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
          case "unverify":
          case "unverified":
            return "bg-gradient-danger"; // Icon box merah untuk alert
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
          case "unverify":
          case "unverified":
            return "bg-danger-subtle text-danger border border-danger"; // Badge merah agak tegas
          default:
            return "bg-light text-dark";
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
          case "unverify":
          case "unverified":
            return "bi bi-x-octagon text-white h5 mb-0"; // Icon X (Gagal)
          default:
            return "bi bi-arrow-repeat text-white h5 mb-0";
        }
      },
      getTextColor(status) {
        switch (status) {
          case "paid":
            return "text-success-theme";
          case "unpaid":
          case "unverify":
          case "unverified":
            return "text-danger-theme";
          default:
            return "text-dark";
        }
      },
      getAmountPrefix(status) {
        if (status === "paid") return "-";
        if (status === "unpaid" || status === "unverify" || status === "unverified") return "+";
        return "";
      },
      formDate(daTe) {
        if (!daTe) return "-";
        const dateObject = new Date(daTe);
        const options = { day: "numeric", month: "short", year: "numeric" };
        return dateObject.toLocaleDateString("id-ID", options);
      },
      nominal(a) {
        return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(a || 0);
      },
      formatTipe(typeString) {
        if (!typeString) return "";
        return typeString
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      },
    },
  };
</script>

<style scoped>
  /* Pertahankan gaya CSS lama Anda, dan tambahkan sedikit utilitas ini jika belum ada */
  .transaction-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .transaction-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
  }

  /* Sisa style Anda dari atas (bg-gradient, tooltip, dll) biarkan sama... */

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
  .bg-secondary-subtle {
    background-color: #e2e3e5;
    color: #41464b;
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .bg-gradient-success {
    background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%);
  }
  .bg-gradient-danger {
    background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  }
  .bg-gradient-warning {
    background: linear-gradient(135deg, #f09819 0%, #edde5d 100%);
  }
  .bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .text-success-theme {
    color: #00b09b;
  }
  .text-danger-theme {
    color: #dd2476;
  }

  .ls-1 {
    letter-spacing: 1px;
  }

  .info-tooltip-wrapper {
    position: relative;
    cursor: pointer;
    margin-top: 2px;
  }
  .tooltip-content {
    visibility: hidden;
    width: 150px;
    background-color: #2d3436;
    color: #fff;
    border-radius: 6px;
    padding: 8px 12px;
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
    border-color: #2d3436 transparent transparent transparent;
  }
  .info-tooltip-wrapper:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>
