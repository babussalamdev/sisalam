<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4">
      <img src="~/assets/image/bank/mandiri.png" alt="mandiri" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'Livin’' ? 'active' : ''" href="javascript:;"
          @click="setType('Livin’')">Livin’</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">ATM
          Bank Lain</a>
      </li>
    </ul>

    <ol v-if="type === 'Livin’'">
      <li>Login ke Livin’.</li>
      <li>Pilih menu “Bayar”.</li>
      <li>Ketik “DOKU VA Aggregator” atau “88899” pada bagian search.</li>
      <li>Masukkan No VA “<CopyButton />” secara keseluruhan, lalu masukkan nominal,
        kemudian tekan Lanjutkan.</li>
      <li>Pastikan detail pembayaran sudah sesuai seperti No VA, Jumlah Pembayaran, dan detail lainnya.</li>
      <li>Pilih Rekening Sumber.</li>
      <li>Pilih Lanjut Bayar kemudian masukkan PIN dan konfirmasi.</li>
      <li>Transaksi selesai dan simpan resi sebagai bukti transaksi.</li>
    </ol>

    <ol v-if="type === 'atm'">

      <li>Masukkan Kartu ATM Mandiri, lalu pilih Bahasa.</li>
      <li>Masukkan PIN ATM.</li>
      <li>Pilih menu “Bayar/Beli”.</li>
      <li>Pilih menu “Lainnya”.</li>
      <li>Kemudian tekan kembali “Lainnya”.</li>
      <li>Pilih menu “Multipayment”.</li>
      <li>Masukkan Kode Perusahaan / Institusi “88899”, kemudian tekan BENAR.</li>
      <li>Masukkan No VA “<CopyButton />” secara keseluruhan, lalu masukkan nominal,
        kemudian tekan Lanjutkan.</li>
      <li>Pastikan detail pembayaran sudah sesuai seperti No VA, Jumlah Pembayaran, dan detail lainnya.</li>
      <li>Konfirmasi pembayaran dengan pilih “YA”.</li>
      <li>Transaksi selesai dan simpan resi sebagai bukti transaksi.</li>
    </ol>

    <ol v-if="type === 'other'">
      <li>Masukkan PIN.</li>
      <li>Pilih menu “Transfer”.</li>
      <li>Pilih “Ke Rek Bank Lain”.</li>
      <li>Masukkan Kode Bank Mandiri “008” dan kode bayar “<CopyButton />” sebagai rekening tujuan, kemudian tekan “Benar”.</li>
      <li>Masukkan Jumlah pembayaran dan pilih “Benar”.</li>
      <li>Muncul layar Konfirmasi Transfer yang berisi Nomor rekening tujuan dan Nama beserta jumlah yang dibayar. Jika
        sudah benar, tekan “Benar”.</li>
      <li>Selesai.</li>
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
      type: 'Livin’'
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
