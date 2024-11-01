<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4">
      <img src="~/assets/image/bank/danamon.png" alt="danamon" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'm-banking' ? 'active' : ''" href="javascript:;"
          @click="setType('m-banking')">M-Banking</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">
          ATM Bersama/Alto/Prima</a>
      </li>
    </ul>

    <ol v-if="type === 'm-banking'">
      <li>Akses D-Mobile melalui smartphone Anda.</li>
      <li>Masukkan User ID dan Password.</li>
      <li>Pilih menu > “Pembayaran” > “Virtual Account”.</li>
      <li>Tambahkan biller baru pembayaran.</li>
      <li>Masukkan 16 digit nomor virtual account (
        <CopyButton />).
      </li>
      <li>Pastikan data pembayaran sudah benar.</li>
      <li>Masukkan mPIN Anda untuk konfirmasi.</li>
      <li>Transaksi selesai, Anda akan mendapatkan info transaksi.</li>
    </ol>

    <ol v-if="type === 'atm'">
      <li>Masukkan kartu ATM Danamon, lalu masukkan PIN ATM Anda.</li>
      <li>Pilih menu > “Pembayaran” > “Lainnya” > “Virtual Account”.</li>
      <li>Masukkan 16 digit nomor virtual account (
        <CopyButton />).
      </li>
      <li>Pastikan data pembayaran sudah benar dan pilih “YA”.</li>
      <li>Transaksi selesai, harap simpan bukti transaksi Anda.</li>
    </ol>

    <ol v-if="type === 'other'">
      <li>Masuk ke menu > “Transfer”.</li>
      <li>Pilih > “Transfer ke bank lain”.</li>
      <li>Masukkan kode Bank Danamon : 011 + 16 digit nomor virtual account di rekening tujuan (<CopyButton />).
      </li>
      <li>Masukkan jumlah pembayaran sesuai tagihan.</li>
      <li>Pastikan data pembayaran sudah benar.</li>
      <li>Pilih > “YA”, untuk melanjutkan transaksi.</li>
      <li>Transaksi selesai, harap simpan bukti transaksi Anda.</li>

    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('formulir', ['payment'])
  },
  data() {
    return {
      type: 'm-banking'
    }
  },
  methods: {
    setType(value) {
      this.type = value
    }
  },
}
</script>

<style lang="scss" scoped></style>
