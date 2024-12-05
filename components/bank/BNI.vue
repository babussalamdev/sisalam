<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4 mb-4">
      <img src="~/assets/image/bank/bni.png" alt="bni" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'm-banking' ? 'active' : ''" href="javascript:;"
          @click="setType('m-banking')">Mobile Banking</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'i-banking' ? 'active' : ''" href="javascript:;"
          @click="setType('i-banking')">Internet Banking</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'teller' ? 'active' : ''" href="javascript:;"
          @click="setType('teller')">Teller</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">ATM
          Bank Lain</a>
      </li>
    </ul>

    <ol v-if="type === 'm-banking'">
      <li>Buka aplikasi BNI Mobile.</li>
      <li>Login ke akun BNI Mobile Banking Anda.</li>
      <li>Pilih menu pembayaran.</li>
      <li>Pilih “Transfer”.</li>
      <li>Pilih E-Commerce.</li>
      <li>Pilih “Virtual Account Billing”, lalu pilih rekening debit Anda.</li>
      <li>Pilih merchant Foolmoon.</li>
      <li>Masukkan Nomor Virtual Account Anda di “Input Baru”.</li>
      <li>Masukkan nomor pembayaran <CopyButton />.</li>
      <li>Konfirmasi bahwa jumlah pembayaran ditampilkan di layar.</li>
      <li>Masukkan PIN.</li>
      <li>Konfirmasi transaksi dan masukkan kata sandi transaksi Anda.</li>
      <li>Konfirmasi transaksi.</li>
      <li>Transaksi berhasil.</li>
    </ol>

    <ol v-if="type === 'atm'">
      <li>Masukkan kartu ATM BNI, lalu masukkan PIN ATM.</li>
      <li>Pilih menu “Menu Lain”, lalu pilih menu “Transfer”.</li>
      <li>Pilih Jenis Akun.</li>
      <li>Pilih “Ke Rekening BNI”.</li>
      <li>Masukkan nomor rekening dengan Kode Pembayaran <CopyButton /> dan pilih
        “Benar”.</li>
      <li>Saat Konfirmasi Pembayaran muncul, pilih “Ya”.</li>
      <li>Transaksi sudah selesai, mohon simpan struknya.</li>
    </ol>

    <ol v-if="type === 'i-banking'">
      <li>Login Internet Banking, lalu pilih menu “Transfer”.</li>
      <li>Pilih menu “In-House”.</li>
      <li>Masukkan nomor rekening dengan Kode Pembayaran Anda <CopyButton /> lalu
        pilih “Kirim”.</li>
      <li>Masukkan “Kata Sandi” dan OTP Anda.</li>
      <li>Transaksi sudah selesai, mohon simpan struknya.</li>
    </ol>

    <ol v-if="type === 'teller'">
      <li>Kunjungi Teller Bank BNI di Kantor BNI.</li>
      <li>Isi Formulir Setoran Tunai.</li>
      <li>Pilih “Tunai” atau tunai. Masukkan Kode Pembayaran <CopyButton /> dan
        jumlah. Tulis nama dan
        tanda tangan Anda.</li>
      <li>Kirim Formulir Setoran Tunai dan uang tunai ke Teller BNI.</li>
      <li>Transaksi selesai, mohon simpan salinan Formulir Setoran Tunai sebagai tanda terima pembayaran.</li>
    </ol>

    <ol v-if="type === 'other'">
      <li>Masukkan kartu ATM, lalu masukkan PIN ATM.</li>
      <li>Pilih menu “Transfer Antar Bank”.</li>
      <li>Masukkan “Kode Bank Tujuan”: BNI (Kode Bank: 009) + Kode Pembayaran <CopyButton />.</li>
      <li>Masukan “jumlah”.</li>
      <li>Saat Konfirmasi Transfer muncul, pilih “Ya” / “Lanjut”.</li>
      <li>Transaksi sudah selesai, silahkan ambil struknya.</li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatSet from '~/mixins/formatSet'
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('topup', ['payment'])
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
