<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4 mb-3">
      <img src="~/assets/image/bank/bsm.png" alt="bsm" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'mobile' ? 'active' : ''" href="javascript:;"
          @click="setType('mobile')">Mobile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'net' ? 'active' : ''" href="javascript:;" @click="setType('net')">BSI Net
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'ebanking' ? 'active' : ''" href="javascript:;"
          @click="setType('ebanking')">e/m-banking bank lain</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">ATM
          Bank Lain</a>
      </li>
    </ul>

    <ol v-if="type === 'mobile'">
      <li>Buka Aplikasi BSI Mobile.</li>
      <li>Pilih Menu pembayaran.</li>
      <li>Pilih menu E-commerce.</li>
      <li>Pilih merchant “DOKU”.</li>
      <li>Pilih Nomor Rekening.</li>
      <li>Masukkan No Bayar:
        <CopyButton /> (No Bayar adalah Nomor VA TANPA 4 digit pertama).
      </li>
      <li>Masukkan PIN BSI Mobile.</li>
      <li>Transaksi selesai.</li>

    </ol>

    <ol v-if="type === 'net'">
      <li>Buka Banking Syariah Indonesia Net.</li>
      <li>Pilih Menu “pembayaran”.</li>
      <li>Pilih Jenis Pembayaran “Institusi”.</li>
      <li>Pilih merchant “DOKU”.</li>
      <li>Masukkan Nomor Pembayaran:
        <CopyButton />.
      </li>
      <li>Klik tombol “Verifikasi Aplikasi Pembayaran”.</li>
      <li>Masukkan PIN dan Token Banking Syariah Indonesia Net.</li>
      <li>Klik tombol “Submit”.</li>
      <li>Transaksi selesai.</li>

    </ol>

    <ol v-if="type === 'atm'">
      <li>Pilih Bahasa.</li>
      <li>Masukkan PIN ATM.</li>
      <li>Pilih “MENU UTAMA”.</li>
      <li>Pilih menu “PEMBAYARAN/PEMBELIAN”.</li>
      <li>Pilih menu “AKADEMIK/INSTITUSI”.</li>
      <li>Masukkan Kode Institusi (6059) dan Nomor Virtual Account ({{ payment.receiver_bank_account.account_number }}) =
        <CopyButton :type="type" /> dan klik “BENAR”.
      </li>
      <li>Klik “BENAR” pada slide konfirmasi.</li>
      <li>Transaksi selesai.</li>

    </ol>

    <ol v-if="type === 'ebanking'">
      <li>Buka menu Transfer ke Rekening Bank lain.</li>
      <li>Pilih bank tujuan “Bank Syariah Indonesia (BSI)” dengan kode bank “451”.</li>
      <li>Masukkan Kode Transfer Bank Lain (900), Kode Institusi (6059), dan Kode Pembayaran {{ payment.receiver_bank_account.account_number }} =
        <CopyButton :type="type" /> sebagai rekening tujuan, kemudian
        tekan “Benar”.
      </li>
      <li>Masukkan Jumlah Pembayaran. Pastikan Jumlah Pembayaran sesuai dengan invoice. Pembayaran akan gagal jika
        Jumlah Pembayaran berbeda dengan invoice.</li>
      <li>Muncul Layar Konfirmasi Transfer yang berisi Nomor rekening tujuan dan Nama beserta jumlah yang dibayar. Jika
        sudah benar, tekan “Benar”.</li>
      <li>Selesai.</li>

    </ol>

    <ol v-if="type === 'other'">
      <li>Buka menu Transfer ke Rekening Bank lain.</li>
      <li>Masukkan Kode Bank BSI (451), Kode Transfer Bank Lain (900), Kode Institusi (6059), dan Kode Pembayaran {{ payment.receiver_bank_account.account_number }} =
        <CopyButton :type="type" /> sebagai rekening tujuan, kemudian tekan “Benar”.
      </li>
      <li>Masukkan Jumlah Pembayaran dan pilih “Benar”. Pastikan Jumlah Pembayaran sesuai dengan invoice. Pembayaran
        akan gagal jika Jumlah Pembayaran berbeda dengan invoice.</li>
      <li>Muncul Layar Konfirmasi Transfer yang berisi Nomor rekening tujuan dan Nama beserta jumlah yang dibayar. Jika
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
      type: 'mobile'
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
