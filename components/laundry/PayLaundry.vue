<template>
  <div class="payment-summary pb-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-12 col-xl-12">
        <!-- Payment Details Card -->
        <div class="card border-0 rounded-4 shadow-lg overflow-hidden mb-3">
          <div class="bg-light p-3 border-bottom border-light">
            <h6 class="mb-0 fw-bold text-dark">Rincian Pembayaran</h6>
          </div>
          <div class="card-body p-4 bg-white">
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Nominal Laundry</span>
              <span class="fw-semibold">Rp {{ nominal(this.$auth.user.DendaLaundry || 0) }}</span>
            </div>
            <hr class="dashed my-3" />
            <div class="d-flex justify-content-between align-items-center">
              <span class="h6 mb-0 text-uppercase fw-bold text-muted">Total Bayar</span>
              <span class="h4 mb-0 fw-bold text-danger-theme">Rp {{ nominal(this.$auth.user.DendaLaundry || 0) }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Method Selection -->
        <div class="mb-3">
          <label class="small text-muted fw-bold mb-2 text-uppercase ls-1">Metode Pembayaran</label>
          <select v-model="paymentMethod" class="form-select rounded-4 shadow-none form-control" style="height: 50px">
            <option value="card">Kartu Santri (Otomatis)</option>
            <option value="transfer">Transfer Bank (Manual)</option>
          </select>
        </div>

        <!-- KARTU SANTRI SECTION -->
        <div v-if="paymentMethod === 'card'">
          <div class="card border-0 rounded-4 shadow-sm mb-4 bg-gradient-wallet text-white overflow-hidden position-relative">
            <div class="decorative-circle"></div>
            <div class="card-body p-3 d-flex align-items-center justify-content-between position-relative z-2">
              <div class="d-flex align-items-center">
                <div class="icon-box-white me-3 text-primary-theme shadow-sm">
                  <i class="bi bi-wallet2 h5 mb-0"></i>
                </div>
                <div>
                  <span class="d-block small opacity-75 text-uppercase ls-1">Saldo Saat Ini</span>
                  <h5 class="fw-bold mb-0">Rp {{ nominal(bill?.Balance) }}</h5>
                </div>
              </div>
              <div v-if="bill?.Balance >= this.$auth.user.DendaLaundry || 0">
                <span class="badge bg-white text-success fw-bold rounded-pill px-3 py-2 shadow-sm">
                  <i class="bi bi-check-circle-fill me-1"></i>
                  Cukup
                </span>
              </div>
              <div v-else>
                <span class="badge bg-white text-danger fw-bold rounded-pill px-3 py-2 shadow-sm">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>
                  Kurang
                </span>
              </div>
            </div>
          </div>
          <div class="alert alert-soft-warning border-0 rounded-4 d-flex align-items-start mb-4">
            <i class="bi bi-info-circle-fill me-3 mt-1 h5"></i>
            <div class="small lh-sm text-dark opacity-75">Pembayaran ini akan memotong saldo kartu santri secara otomatis.</div>
          </div>
        </div>

        <!-- TRANSFER BANK SECTION -->
        <div v-if="paymentMethod === 'transfer'">
          <div class="card border-0 rounded-4 shadow-sm mb-4 p-3 bg-light">
            <h6 class="fw-bold mb-3">Instruksi Pembayaran Mandiri Virtual Account</h6>
            <div class="alert alert-info border-0 rounded-3 mb-3 small">
              <strong>Biller Name:</strong>
              DOKU FIX AMOUNT
              <br />
              <strong>Code:</strong>
              86188
              <br />
              <em>*Silakan cari "DOKU FIX AMOUNT" langsung di kolom pencarian (search bar) aplikasi Mandiri Anda.</em>
            </div>

            <div class="mb-3">
              <label class="small text-muted fw-bold mb-2">Upload Bukti Transfer</label>
              <!-- Disable upload if status is unconfirmed/pending -->
              <input type="file" class="form-control" accept="image/*" @change="handleFileUpload" :disabled="isTransferPending" />
            </div>

            <!-- Status Alerts -->
            <div v-if="isTransferPending" class="alert alert-warning border-0 rounded-3 small mb-0">
              <i class="bi bi-hourglass-split me-2"></i>
              Bukti transfer Anda sedang menunggu konfirmasi admin. Anda tidak dapat mengupload ulang saat ini.
            </div>
            <div v-if="bill?.TransferStatus === 'failed'" class="alert alert-danger border-0 rounded-3 small mb-0">
              <i class="bi bi-x-circle me-2"></i>
              Pembayaran sebelumnya ditolak. Silakan upload ulang bukti transfer yang valid.
            </div>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="d-grid gap-2">
          <!-- Card Button -->
          <button
            v-if="paymentMethod === 'card' && !load"
            @click="requestPay"
            class="btn btn-gradient btn-lg rounded-4 shadow fw-bold text-white py-3">
            Bayar Sekarang
          </button>

          <!-- Transfer Button -->
          <button
            v-if="paymentMethod === 'transfer' && !load"
            @click="requestPayTransfer"
            class="btn btn-gradient btn-lg rounded-4 shadow fw-bold text-white py-3"
            :disabled="isTransferPending || (!transferFile && bill?.TransferStatus !== 'failed')">
            Upload & Bayar
          </button>

          <!-- Loading State -->
          <button v-if="load" class="btn btn-gradient btn-lg rounded-4 shadow fw-bold text-white py-3" type="button" disabled>
            <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            Memproses...
          </button>

          <nuxt-link to="/laundry" class="btn btn-danger btn-lg rounded-4 text-white fw-semibold mt-2">Batalkan</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import formatSet from "~/mixins/formatSet";
  import Swal from "sweetalert2";

  export default {
    mixins: [formatSet],
    data() {
      return {
        paymentMethod: "card",
        transferFile: null,
      };
    },
    computed: {
      ...mapState("laundry", ["load", "bill"]),

      // Checks if there is an ongoing transfer awaiting confirmation
      isTransferPending() {
        return this.bill?.TransferStatus === "unconfirmed" || this.bill?.TransferStatus === "pending";
      },
    },
    methods: {
      ...mapActions("laundry", ["requestPay", "submitTransferPay"]),

      nominal(a) {
        return new Intl.NumberFormat("id-ID", {
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(a || 0);
      },

      handleFileUpload(event) {
        this.transferFile = event.target.files[0];
      },

      async requestPayTransfer() {
        const Amount = this.$auth.user.DendaLaundry || 0;

        if (!Amount || Amount <= 0) {
          return Swal.fire({
            icon: "info",
            title: "Tidak Ada Tagihan",
            text: "Jumlah tagihan Anda adalah Rp 0. Tidak ada pembayaran yang diperlukan.",
          });
        }

        if (!this.transferFile) {
          return Swal.fire({
            icon: "warning",
            title: "Bukti Transfer Kosong",
            text: "Silakan upload bukti transfer terlebih dahulu.",
          });
        }

        // Dispatch action to Vuex store passing the file
        await this.submitTransferPay({
          file: this.transferFile,
          amount: Amount,
        });
      },
    },
  };
</script>

<style scoped>
  /* --- THEME COLORS --- */
  .text-primary-theme {
    color: #667eea;
  }

  .text-danger-theme {
    color: #dd2476; /* Matches the Tagihan color for consistency */
  }

  /* --- WALLET SECTION DESIGN --- */
  .bg-gradient-wallet {
    /* Matches your Main Card Theme */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .icon-box-white {
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .decorative-circle {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
  }

  .z-2 {
    z-index: 2;
  }

  /* --- BUTTONS --- */
  .btn-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-gradient:active {
    transform: scale(0.98);
  }

  /* --- UTILITIES --- */
  .alert-soft-warning {
    background-color: #fff8e1;
    color: #856404;
  }

  hr.dashed {
    border-top: 2px dashed #e2e8f0;
    opacity: 1;
  }

  .ls-1 {
    letter-spacing: 1px;
    font-size: 0.75rem;
  }

  .form-control:focus {
    border-color: #e2e8f0;
    box-shadow: none;
  }
</style>
