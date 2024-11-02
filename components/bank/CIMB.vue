<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4">
      <img src="~/assets/image/bank/cimb.png" alt="cimb" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'octo' ? 'active' : ''" href="javascript:;" @click="setType('octo')">Octo
          Mobile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'i-banking' ? 'active' : ''" href="javascript:;"
          @click="setType('i-banking')">I-Banking Lain</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'octoc' ? 'active' : ''" href="javascript:;" @click="setType('octoc')">Octo
          Clicks
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">ATM
          Alto/Bersama/Prima</a>
      </li>
    </ul>

    <ol v-if="type === 'octo'">
      <li>Login ke Octo Mobile.</li>
      <li>Pilih menu: Transfer.</li>
      <li>Pilih menu: Transfer to Other CIMB Niaga Account.</li>
      <li>Pilih Source of fund.</li>
      <li>Masukkan nomor virtual account
        <CopyButton />.
      </li>
      <li>Masukkan jumlah pembayaran (Amount) sesuai tagihan.</li>
      <li>Klik tombol Next.</li>
      <li>Nomor virtual account, nama virtual account dan jumlah pembayaran (Amount) ditampilkan pada layar.</li>
      <li>Klik tombol Confirm.</li>
      <li>Masukkan Mobile Banking PIN.</li>

    </ol>

    <ol v-if="type === 'i-banking'">
      <li>Login ke internet banking.</li>
      <li>Pilih menu transfer ke Bank Lain Online.</li>
      <li>Pilih bank tujuan Bank CIMB Niaga (kode bank: 022).</li>
      <li>Masukkan nomor virtual account
        <CopyButton />.
      </li>
      <li>Masukkan jumlah pembayaran sesuai tagihan.</li>
      <li>Nomor, nama virtual account, dan jumlah billing ditampilkan pada layar.</li>
      <li>Ikuti instruksi untuk menyelesaikan transaksi.</li>
      <li>Konfirmasi pembayaran ditampilkan pada layar.</li>
    </ol>

    <ol v-if="type === 'octoc'">
      <li>Login ke OCTO Clicks (<a href="https://www.octoclicks.co.id"
          target="_blank">https://www.octoclicks.co.id</a>).</li>
      <li>Pilih menu: Pembayaran Tagihan.</li>
      <li>Pilih kategori transaksi: Virtual Account.</li>
      <li>Pilih rekening sumber dana.</li>
      <li>Masukkan nomor virtual account
        <CopyButton /> dan klik tombol: Lanjutkan untuk verifikasi detail.
      </li>
      <li>Nomor virtual account, nama virtual account, dan total tagihan ditampilkan pada layar.</li>
      <li>Masukkan 6 digit OTP dan tekan tombol Submit.</li>
      <li>Klik tombol Konfirmasi untuk memproses pembayaran.</li>

    </ol>

    <ol v-if="type === 'atm'">
      <li>Masukkan Kartu ATM dan PIN CIMB Anda.</li>
      <li>Pilih menu Pembayaran > Lanjut > Virtual Account.</li>
      <li>Masukkan nomor virtual account
        <CopyButton />.
      </li>
      <li>Pilih rekening debit.</li>
      <li>Nomor, nama virtual account, dan jumlah billing ditampilkan pada layar.</li>
      <li>Pilih OK untuk melakukan pembayaran.</li>
      <li>Konfirmasi pembayaran ditampilkan pada layar.</li>

    </ol>


    <ol v-if="type === 'other'">
      <li>Masukkan Kartu ATM dan PIN Anda pada mesin ATM bank tersebut.</li>
      <li>Pilih menu TRANSFER > TRANSFER KE BANK LAIN.</li>
      <li>Masukkan kode bank CIMB Niaga: 022.</li>
      <li>Masukkan jumlah pembayaran sesuai tagihan.</li>
      <li>Masukkan nomor virtual account
        <CopyButton />.
      </li>
      <li>Ikuti instruksi untuk menyelesaikan transaksi.</li>
      <li>Konfirmasi pembayaran ditampilkan pada layar.</li>

    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('topup', ['payment'])
  },
  data() {
    return {
      type: 'octo'
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
