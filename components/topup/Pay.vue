<template>
  <div v-if="!payment || slip === 'no'" class="px-1 pt-1 pb-3 p-md-4">
    <div v-if="!payment || payment.status !== 'PENDING'">
      <form v-if="!bank" @submit.prevent="getInvoice" id="formSelectBank">
        <div class="row custom-container mx-auto">
          <div class="col-12 mb-4">
            <h6 class="text-muted small fw-bold text-uppercase ls-1 mb-2">Nominal Top Up</h6>
            <div class="input-group input-group-modern shadow-sm rounded-4 overflow-hidden">
              <span class="input-group-text bg-white border-0 fw-bold text-dark px-3">Rp</span>
              <input
                class="form-control border-0 fw-bold fs-5 py-3"
                type="number"
                name="Amount"
                min="10000"
                :max="maxTopupLimit"
                v-model="amountLimit"
                @input="handleInputChange"
                placeholder="0"
                required />
            </div>
            <small class="text-muted mt-2 d-block" style="font-size: 11px">Minimal Rp 10.000</small>
          </div>

          <div class="col-12 mb-4">
            <h6 class="text-muted small fw-bold text-uppercase ls-1 mb-3">Metode Pembayaran</h6>

            <div class="bank-list">
              <label
                v-for="(data, i) in arrayBank"
                :key="i"
                class="bank-item d-flex align-items-center justify-content-between p-3 mb-2 rounded-4 border transition-all cursor-pointer"
                :class="selectedBank === data ? 'border-primary bg-primary-subtle shadow-md' : 'border-light bg-white shadow-sm'">
                <div class="d-flex align-items-center">
                  <div class="bank-logo-wrapper bg-white shadow-sm rounded-3 me-3 d-flex align-items-center justify-content-center">
                    <img :src="require(`@/assets/image/bank/${data}.png`)" :alt="data" class="bank-logo-img" />
                  </div>
                  <span class="fw-semibold text-dark" style="font-size: 14px">
                    {{ formatBankName(data) }}
                  </span>
                </div>

                <div class="custom-radio-wrapper">
                  <input type="radio" class="d-none" name="Bank" :id="data" :value="data" v-model="selectedBank" required />
                  <div class="radio-indicator" :class="{ active: selectedBank === data }"></div>
                </div>
              </label>
            </div>
          </div>

          <div class="col-12 mt-2">
            <button
              v-if="!load"
              type="submit"
              class="btn btn-primary-theme w-100 py-3 rounded-4 fw-bold shadow-sm"
              :disabled="!isFormValid"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }">
              Lanjutkan Pembayaran
            </button>
            <button v-else class="btn btn-primary-theme w-100 py-3 rounded-4 fw-bold disabled" type="button">
              <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              Memproses...
            </button>
          </div>
        </div>
      </form>

      <div v-else class="row justify-content-center custom-container mx-auto">
        <div class="row gy-3 mb-4 align-items-center">
          <div class="col-12 col-lg-7">
            <div class="alert alert-warning border-0 rounded-4 shadow-sm mb-0 d-flex align-items-start">
              <i class="bi bi-clock-history me-2 fs-5"></i>
              <small class="lh-sm">
                Pembayaran aktif selama
                <strong>30 menit</strong>
                . Pastikan Anda sudah siap membayar.
              </small>
            </div>
          </div>
          <div class="col-12 col-lg-5 text-center text-lg-end">
            <div class="bg-white p-2 rounded-4 shadow-sm d-inline-block">
              <img :src="require(`@/assets/image/bank/${bank}.png`)" class="img-fluid" style="max-height: 40px" />
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-12">
            <div class="card border-0 rounded-4 shadow-sm overflow-hidden">
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <td class="text-muted px-4 py-3 border-bottom-0 fs-6">Nominal Topup</td>
                    <td class="text-end fw-semibold text-dark px-4 py-3 border-bottom-0 text-nowrap">Rp {{ nominal(amount) }}</td>
                  </tr>
                  <tr>
                    <td class="text-muted px-4 pb-3 border-bottom-0 fs-6">Biaya Admin</td>
                    <td class="text-end fw-semibold text-dark px-4 pb-3 border-bottom-0 text-nowrap">
                      Rp {{ bank === "qris" ? nominal(feeQris) : nominal(feeBank) }}
                    </td>
                  </tr>
                  <tr class="bg-light">
                    <td class="text-dark fw-bold px-4 py-3 text-uppercase fs-6">Total Pembayaran</td>
                    <td class="text-end fw-bold text-primary px-4 py-3 fs-5 text-nowrap">
                      Rp {{ bank === "qris" ? nominal(amount + feeQris) : nominal(amount + feeBank) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex gap-2 justify-content-end">
            <button @click="removeBank" class="btn btn-light rounded-4 px-4 fw-bold">Kembali</button>
            <button v-if="!load" @click="requestFlip" class="btn btn-primary-theme rounded-4 px-5 fw-bold shadow-sm">Bayar</button>
            <button v-else class="btn btn-primary-theme rounded-4 px-5 fw-bold disabled" type="button">
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="payment.sender_bank_type === 'wallet_account'">
        <div class="card border-0 rounded-4 shadow-sm p-4 text-center mt-3 mx-auto" style="max-width: 400px">
          <img :src="require(`~/assets/image/bank/qris.png`)" class="mx-auto mb-3" style="width: 120px; height: auto" />
          <Countdown class="pb-3" />
          <div class="bg-white p-3 rounded-4 shadow-sm d-inline-block border">
            <qrcode-vue :value="payment.receiver_bank_account.qr_code_data" :size="220" level="H" render-as="svg"></qrcode-vue>
          </div>
        </div>
      </div>
      <div v-else class="mt-3">
        <BNI v-if="payment.sender_bank === 'bni'" />
        <BRI v-if="payment.sender_bank === 'bri'" />
        <BSI v-if="payment.sender_bank === 'bsm'" />
        <CIMB v-if="payment.sender_bank === 'cimb'" />
        <Danamon v-if="payment.sender_bank === 'danamon'" />
        <Mandiri v-if="payment.sender_bank === 'mandiri'" />
        <Permata v-if="payment.sender_bank === 'permata'" />
        <div class="text-center mt-4">
          <Countdown />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="card border-0 rounded-4 shadow-sm py-5 px-3 px-md-4 mt-3 mx-auto custom-container">
    <div ref="receiptContent" class="px-1 text-center">
      <div class="d-flex justify-content-center align-items-center mb-4">
        <div class="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center" style="width: 90px; height: 90px">
          <i class="bi bi-check-lg text-success" style="font-size: 50px"></i>
        </div>
      </div>
      <h5 class="text-dark fw-bold mb-1">Top Up Berhasil!</h5>
      <p class="text-muted small mb-4">Transaksi Anda telah selesai diproses.</p>

      <p class="text-muted mb-1 small text-uppercase ls-1">Total Pembayaran</p>
      <h2 class="text-dark mb-4 fw-bold">Rp {{ nominal(payment?.amount) }}</h2>

      <div class="row g-3 text-start mb-4">
        <div class="col-6">
          <div class="bg-light p-3 rounded-4 h-100">
            <p class="text-muted small mb-1">Ref ID</p>
            <h6 class="fw-bold mb-0 text-truncate">{{ payment?.link_id }}</h6>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-light p-3 rounded-4 h-100">
            <p class="text-muted small mb-1">Waktu</p>
            <h6 class="fw-bold mb-0" style="font-size: 13px">{{ payment?.UpdatedAt }}</h6>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-light p-3 rounded-4 h-100">
            <p class="text-muted small mb-1">Metode</p>
            <h6 class="fw-bold mb-0">{{ payment?.sender_bank_type === "virtual_account" ? "Virtual Account" : "QRIS" }}</h6>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-light p-3 rounded-4 h-100">
            <p class="text-muted small mb-1">Nama</p>
            <h6 class="fw-bold mb-0 text-capitalize text-truncate">{{ payment?.receiver_bank_account?.account_holder || "-" }}</h6>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="setReceipePayment(true)"
      class="btn btn-outline-primary py-2 rounded-pill fw-bold mb-2 d-flex align-items-center justify-content-center gap-2 w-100">
      <i class="bi bi-download"></i>
      Bukti Pembayaran
    </button>
    <button @click="goToPage" class="btn btn-primary-theme py-2 rounded-pill fw-bold w-100">Kembali ke Beranda</button>
    <ReceipePayment v-if="receipePayment" />
  </div>
</template>

<script>
  import QrcodeVue from "qrcode.vue";
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  import formatSet from "~/mixins/formatSet";

  export default {
    mixins: [formatSet],
    components: {
      QrcodeVue,
    },
    data() {
      return {
        amountLimit: "",
        batasTopup: "",
        warningMessage: "",
        selectedBank: "", // NEW: Tracks the selected radio button for styling
      };
    },
    computed: {
      ...mapState("topup", [
        "load",
        "user",
        "arrayBank",
        "payment",
        "bank",
        "limit",
        "card",
        "receipePayment",
        "amount",
        "feeQris",
        "feeBank",
        "slip",
      ]),
      ...mapGetters("topup", ["getCode"]),
      code: {
        get() {
          return this.getCode;
        },
        set(value) {
          this.setValue({ key: "code", value });
        },
      },
      isFormValid() {
        const amount = Number(this.amountLimit);
        return amount >= 10000 && this.selectedBank !== "";
      },
      maxTopupLimit() {
        const limitAmount = this.limit && this.limit.Amount ? parseInt(this.limit.Amount) : 0;
        const currentBalance = this.card && this.card.Balance ? parseInt(this.card.Balance) : 0;
        const result = limitAmount - currentBalance;
        return result > 0 ? result : 0;
      },
    },
    methods: {
      ...mapMutations("topup", ["setValue", "getInvoice", "removeBank", "setReceipePayment"]),
      ...mapActions("topup", ["matchVoucher", "nextStep", "requestFlip", "resetTopup"]),

      goToPage() {
        this.resetTopup({ page: "/card", router: this.$router });
      },
      rupiah(a) {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(a);
      },
      nominal(a) {
        return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(a);
      },
      numVa(a) {
        return a.toString().padStart(3, "0");
      },
      handleInputChange() {
        let val = parseInt(this.amountLimit);
        if (isNaN(val)) val = 0;

        if (val > this.maxTopupLimit) {
          this.amountLimit = this.maxTopupLimit;
        } else {
          this.amountLimit = val;
        }

        this.setValue({ key: "amount", value: this.amountLimit });
      },
      // NEW: Formatter for bank display names
      formatBankName(code) {
        const names = {
          bni: "BNI Virtual Account",
          bri: "BRI Virtual Account",
          bsm: "BSI Virtual Account",
          cimb: "CIMB Virtual Account",
          danamon: "Danamon Virtual Account",
          mandiri: "Mandiri Virtual Account",
          permata: "Permata Virtual Account",
          qris: "QRIS",
        };
        return names[code.toLowerCase()] || code.toUpperCase();
      },
    },
  };
</script>

<style scoped>
  /* Main Container Constrain */
  .custom-container {
    max-width: 600px;
  }

  /* Typography & Utilities */
  .ls-1 {
    letter-spacing: 1px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .transition-all {
    transition: all 0.2s ease-in-out;
  }

  /* Modern Input Style */
  .input-group-modern {
    border: 1px solid #e2e8f0;
  }
  .input-group-modern:focus-within {
    border-color: #4b55a2;
    box-shadow: 0 0 0 4px rgba(75, 85, 162, 0.1) !important;
  }
  .input-group-modern input:focus {
    outline: none;
    box-shadow: none;
  }

  /* Bank List Styles (Tokopedia style) */
  .bank-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bank-item {
    border-color: #f1f5f9 !important;
  }

  .bank-item:hover {
    transform: translateY(-1px);
    border-color: #cbd5e1 !important;
  }

  .bank-logo-wrapper {
    width: 50px;
    height: 35px;
    border: 1px solid #f1f5f9;
  }

  .bank-logo-img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  /* Custom Radio Button Styling */
  .custom-radio-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radio-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    position: relative;
    transition: all 0.2s ease;
  }

  .radio-indicator.active {
    border-color: #4b55a2;
  }

  .radio-indicator.active::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #4b55a2;
  }

  /* Active State Overrides */
  .bg-primary-subtle {
    background-color: #f0f4ff !important; /* Soft blue tint */
  }
  .border-primary {
    border-color: #4b55a2 !important;
  }

  /* Button Theme */
  .btn-primary-theme {
    background: linear-gradient(135deg, #66a6ea 0%, #4b55a2 100%);
    border: none;
    color: white;
    transition: transform 0.2s ease, box-shadow 0.2s;
  }
  .btn-primary-theme:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(75, 85, 162, 0.25) !important;
  }
  .text-primary {
    color: #4b55a2 !important;
  }
</style>
