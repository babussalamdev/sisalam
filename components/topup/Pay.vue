<template>
  <div v-if="!payment || slip === 'no'" class="px-1 pt-1 pb-3 p-md-4">
    <div v-if="!payment || payment.status !== 'PENDING'">
      <form v-if="!bank" @submit.prevent="getInvoice" id="formSelectBank">
        <div class="row">
          <!-- <div class="col-12 mb-3">
            <button class="btn btn-sm btn-secondary">Kembali</button>
          </div> -->
          <small class="mb-2">Masukkan Nilai Topup :</small>
          <div class="col-12">
            <div class="input-group mb-3">
              <span class="input-group-text">Rp</span>
              <input class="form-control" type="number" name="Amount" min="10000" max="500000">
            </div>
          </div>
          <small>Silahkan pilih metode pembayaran berikut :</small>
          <div class="col-6 col-lg-4 g-3" v-for="(data, i) in arrayBank" :key="i">
            <div class="form-content">
              <input type="radio" class="btn-check" name="Bank" :id="data" :value="data" autocomplete="off" required>
              <label :for="data">
                <img :src="require(`@/assets/image/bank/${data}.png`)" :alt="data"
                  class="rounded-4 border border-1 border-dark img-fluid" style="width: 350px; height: auto;">
              </label>
            </div>
          </div>
          <div class="col-12 mt-4">
            <button v-if="!load" type="submit" class="btn btn-primary w-100">Lanjutkan Pembayaran</button>
            <button v-else class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Loading...</span>
            </button>
          </div>
        </div>
      </form>

      <div v-else class="row justify-content-center">
        <div class="row gy-3 mb-3">
          <!-- <div v-if="!user.Diskon" class="col-12">
            <td colspan="3" class="float-end input-group input-group-sm">
              <input type="text" v-model="code" class="form-control form-control-sm border border-2 mb-0"
                placeholder="Kode Voucher">
              <button v-if="!load" @click="matchVoucher" class="btn btn-sm btn-primary" type="button">Submit</button>
              <button v-else class="btn btn-sm btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Wait</span>
              </button>
            </td>
          </div> -->
          <small class="col-12 col-lg-7 text-danger">Untuk pembayaran hanya aktif selama 1x24 jam pastikan anda sudah
            siap membayar sebelum menekan tombol bayar.</small>
          <div class="col-12 col-lg-5">
            <a class="d-block text-end" href="#!">
              <img :src="require(`@/assets/image/bank/${bank}.png`)" class="img-fluid" width="250" height="auto">
            </a>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-striped">
                <tbody class="table-group-divider">
                  <tr>
                    <!-- <td class="text-capitalize">nominal topup - {{ layout.Name }}</td> -->
                    <td class="text-capitalize">nominal topup</td>
                    <td colspan="2" class="text-end">{{ nominal(amount) }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-end text-capitalize">biaya admin</td>
                    <td colspan="2" class="text-end">{{ nominal(fee) }}</td>
                    <!-- <td :class="`text-end ${user.Diskon ? 'text-danger' : ''}`">{{ user.Diskon ? `-
                      ${nominal(user.Diskon)}` : 0 }}</td> -->
                  </tr>
                  <tr>
                    <th scope="row" colspan="2" class="text-uppercase text-end">Total</th>
                    <td class="text-end">{{ nominal(amount + fee) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-end">
            <button @click="removeBank" class="btn btn-secondary mb-3">Kembali</button>
            <button v-if="!load" @click="requestFlip" class="btn btn-primary mb-3">Bayar</button>
            <button v-else class="btn btn-primary mb-3" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Wait</span>
            </button>
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <div v-if="payment.sender_bank_type === 'wallet_account'">
        <div class="card-body">
          <div class="d-flex flex-column justify-content-center align-items-center mb-0">
            <img :src="require(`~/assets/image/bank/qris.png`)" class="card-img-top"
              style="width: 150px; height: auto;">
            <Countdown class="pb-3" />
            <qrcode-vue style="border: 7px solid #5CBAFF;" :value="payment.receiver_bank_account.qr_code_data"
              :size="250" level="H" render-as="svg"></qrcode-vue>
          </div>
        </div>
      </div>
      <div v-else>
        <BNI v-if="payment.sender_bank === 'bni'" />
        <BRI v-if="payment.sender_bank === 'bri'" />
        <BSI v-if="payment.sender_bank === 'bsm'" />
        <CIMB v-if="payment.sender_bank === 'cimb'" />
        <Danamon v-if="payment.sender_bank === 'danamon'" />
        <Mandiri v-if="payment.sender_bank === 'mandiri'" />
        <Permata v-if="payment.sender_bank === 'permata'" />
        <div class="text-center">
          <Countdown />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card py-4 px-2 px-md-4">
    <!-- Receipt Content -->
    <div ref="receiptContent" class="px-1">
      <span class="d-flex justify-content-center align-items-center mb-3">
        <div class="d-flex justify-content-center align-items-center bg-success-subtle p-3 rounded-circle"
          style="width: 107px !important; height: 107px !important;">
          <i class="bi bi-check-circle text-success text-center" style="font-size: 75px;"></i>
        </div>
      </span>
      <h5 class="text-center text-dark">Pembayaran Anda Telah Berhasil</h5>
      <hr>
      <p class="text-center text-dark mb-1">Total Pembayaran</p>
      <h2 class="text-center text-dark mb-4 fw-bold">Rp {{ nominal(payment?.amount) }}</h2>
      <div class="row mb-3">
        <div class="col-6 px-1">
          <div class="card p-3 mb-3">
            <h6 class="mb-1">Ref</h6>
            <h5 class="fw-bold mb-0">{{ payment?.link_id }}</h5>
          </div>
        </div>
        <div class="col-6 px-1">
          <div class="card p-3 mb-3">
            <h6 class="mb-1">Waktu Pembayaran</h6>
            <h5 class="fw-bold mb-0">{{ payment?.UpdatedAt }}</h5>
          </div>
        </div>
        <div class="col-6 px-1">
          <div class="card p-3 mb-3">
            <h6 class="mb-1">Metode Pembayaran</h6>
            <h5 class="fw-bold mb-0">{{ payment?.sender_bank_type === 'virtual_account' ? 'Bank Transfer'
              : 'QRIS' }}
            </h5>
          </div>
        </div>
        <div class="col-6 px-1">
          <div class="card p-3 mb-3">
            <h6 class="mb-1">Nama Pengirim</h6>
            <h5 class="fw-bold mb-0 text-capitalize">{{ payment?.receiver_bank_account?.account_holder }}</h5>
          </div>
        </div>
      </div>
    </div>
    <!-- Download PDF Button -->
    <a href="javascript:;"
      class="text-center text-white justify-content-center text-decoration-none btn btn-sm btn-primary gap-2 d-flex align-items-center mb-3"
      @click="setReceipePayment(true)">
      <span class="material-icons">
        download
      </span>
      Bukti Pembayaran
    </a>
    <a href="javascript:;" @click="goToPage" class="btn btn-dark">Kembali Top Up</a>
    <ReceipePayment v-if="receipePayment" />
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  components: {
    QrcodeVue,
  },
  data() {
    return {
      amountTopup: 0,
      batasTopup: '',
      warningMessage: '',
    }
  },
  computed: {
    ...mapState('topup', ['load', 'user', 'arrayBank', 'payment', 'bank', 'receipePayment', 'amount', 'fee', 'slip']),
    ...mapGetters('topup', ['getCode']),
    code: {
      get() {
        return this.getCode;
      },
      set(value) {
        const obj = {
          key: 'code',
          value
        }
        this.setValue(obj)
      }
    }
  },
  methods: {
    ...mapMutations('topup', ['setValue', 'getInvoice', 'removeBank', 'setReceipePayment']),
    ...mapActions('topup', ['matchVoucher', 'nextStep', 'requestFlip', 'resetTopup']),
    goToPage() {
      this.resetTopup({ page: '/card', router: this.$router });
    },
    rupiah(a) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(a)
    },
    nominal(a) {
      return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0
      }).format(a)
    },
    numVa(a) {
      return a.toString().padStart(3, '0');
    },
  },
}
</script>
<style scoped>
.form-content input[type=radio]:checked+label,
.form-content input[type=radio]:not(:checked)+label {
  padding: 0;
}

.form-content input[type=radio]:checked+label:before,
.form-content input[type=radio]:not(:checked)+label:before {
  content: none
}

.form-content input[type=radio]:checked+label:after,
.form-content input[type=radio]:not(:checked)+label:after {
  content: none
}

.form-content input[type=radio]:not(:checked)+label img {
  background-color: transparent;
  filter: grayscale(100%);
}

.form-content input[type=radio]:checked+label img {
  background-color: aliceblue;
  filter: grayscale(0%);
  /* Kembali ke warna asli */
}

@media (max-width: 576px) {
  h6 {
    font-size: 12px;
  }

  h5 {
    font-size: 14px;
  }
}
</style>
