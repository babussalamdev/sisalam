<template>
  <div class="payment-summary pb-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div v-if="!user.Diskon" class="card border-0 rounded-4 shadow-sm mb-3">
          <div class="card-body p-3">
            <label class="small text-muted fw-bold mb-2 text-uppercase ls-1">Kode Promo / Voucher</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 rounded-start-4 ps-3">
                <i class="bi bi-ticket-perforated-fill text-primary-theme"></i>
              </span>
              <input type="text" class="form-control border-start-0 shadow-none" placeholder="Masukkan kode disini" />
              <button v-if="!load" @click="matchVoucher" class="btn btn-dark rounded-end-4 px-4 fw-semibold" type="button">Apply</button>
              <button v-else class="btn btn-dark rounded-end-4 px-4" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-lg overflow-hidden mb-3">
          <div class="bg-light p-3 border-bottom border-light">
            <h6 class="mb-0 fw-bold text-dark">Rincian Pembayaran</h6>
          </div>

          <div class="card-body p-4 bg-white">
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Nominal Laundry</span>
              <span class="fw-semibold">Rp {{ nominal(50000) }}</span>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Biaya Admin</span>
              <span class="fw-semibold">Rp {{ nominal(5000) }}</span>
            </div>

            <div v-if="user.Diskon" class="d-flex justify-content-between mb-3 text-success">
              <span>Diskon Voucher</span>
              <span class="fw-bold">- Rp {{ nominal(user.Diskon) }}</span>
            </div>

            <hr class="dashed my-3" />

            <div class="d-flex justify-content-between align-items-center">
              <span class="h6 mb-0 text-uppercase fw-bold text-muted">Total Bayar</span>
              <span class="h4 mb-0 fw-bold text-danger-theme">Rp {{ nominal(50000 + 5000 - (user.Diskon || 0)) }}</span>
            </div>
          </div>
        </div>

        <div class="card border-0 rounded-4 shadow-sm mb-4 bg-gradient-wallet text-white overflow-hidden position-relative">
          <div class="decorative-circle"></div>

          <div class="card-body p-3 d-flex align-items-center justify-content-between position-relative z-2">
            <div class="d-flex align-items-center">
              <div class="icon-box-white me-3 text-primary-theme shadow-sm">
                <i class="bi bi-wallet2 h5 mb-0"></i>
              </div>
              <div>
                <span class="d-block small opacity-75 text-uppercase ls-1">Saldo Saat Ini</span>
                <h5 class="fw-bold mb-0">Rp {{ nominal(card?.Balance) }}</h5>
              </div>
            </div>

            <div v-if="card?.Balance >= 55000 - (user.Diskon || 0)">
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

        <div class="d-grid gap-2">
          <button v-if="!load" @click="requestFlip" class="btn btn-gradient btn-lg rounded-4 shadow fw-bold text-white py-3">Bayar Sekarang</button>

          <button v-else class="btn btn-gradient btn-lg rounded-4 shadow fw-bold text-white py-3" type="button" disabled>
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
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  import formatSet from "~/mixins/formatSet";

  export default {
    mixins: [formatSet],
    mounted() {
      console.log("Card Object:", this.card);
      console.log("Balance Type:", typeof this.card?.Balance);
    },
    computed: {
      // FIXED VUEX MAPPING
      // You cannot combine two modules in one mapState string. They must be separate.
      ...mapState("topup", ["load", "user"]),
      ...mapState("index", ["card"]), // This fetches the Balance correctly
    },

    methods: {
      ...mapMutations("topup", ["setValue", "getInvoice", "removeBank", "setReceipePayment"]),
      ...mapActions("topup", ["matchVoucher", "nextStep", "requestFlip", "resetTopup"]),
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
