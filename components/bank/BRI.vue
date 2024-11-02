<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4 mb-3">
      <img src="~/assets/image/bank/bri.png" alt="bri" style="width: 175px;">
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
          @click="setType('teller')">EDC BRI</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;" @click="setType('other')">ATM
          Bank Lain</a>
      </li>
    </ul>

    <ol v-if="type === 'm-banking'">
      <li>Login aplikasi BRI Mobile.</li>
      <li>Pilih menu <strong>BRIVA</strong>.</li>
      <li>Pilih <strong>Pembayaran Baru</strong>.</li>
      <li>Masukkan kode pembayaran / virtual account number Anda: <strong>
          <CopyButton />
        </strong>.</li>
      <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Total
        Pembayaran.</li>
      <li>Masukkan PIN.</li>
      <li>Simpan notifikasi SMS sebagai bukti pembayaran.</li>
    </ol>

    <ol v-if="type === 'atm'">
      <li>Masukkan Kartu Debit BRI dan PIN Anda.</li>
      <li>Pilih menu <strong>Transaksi Lain</strong> > <strong>Pembayaran</strong> > <strong>Lainnya</strong> >
        <strong>BRIVA</strong>.
      </li>
      <li>Masukkan kode pembayaran / virtual account number Anda: <strong>
          <CopyButton />
        </strong>.</li>
      <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah
        Pembayaran.</li>
      <li>Ikuti instruksi untuk menyelesaikan transaksi.</li>
      <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
    </ol>

    <ol v-if="type === 'i-banking'">
      <li>Login pada alamat <a href="https://ib.bri.co.id/ib-bri/Login.html" target="_blank">Internet Banking BRI</a>.
      </li>
      <li>Pilih menu <strong>Pembayaran Tagihan</strong> > <strong>Pembayaran</strong> > <strong>BRIVA</strong>.</li>
      <li>Masukkan kode pembayaran / virtual account number Anda: <strong>
          <CopyButton />
        </strong>.</li>
      <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah
        Pembayaran.</li>
      <li>Masukkan password dan mToken.</li>
      <li>Cetak/simpan struk pembayaran BRIVA sebagai bukti pembayaran.</li>
    </ol>

    <ol v-if="type === 'teller'">
      <li>Pilih menu <strong>Mini ATM</strong> > <strong>Pembayaran</strong> > <strong>BRIVA</strong>.</li>
      <li>Swipe Kartu Debit BRI Anda.</li>
      <li>Masukkan kode pembayaran / virtual account number Anda: <strong>
          <CopyButton />
        </strong>.</li>
      <li>Masukkan PIN.</li>
      <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah
        Pembayaran.</li>
      <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
    </ol>

    <ol v-if="type === 'other'">
      <li>Masukkan Kartu Debit dan PIN Anda.</li>
      <li>Pilih menu <strong>Transaksi Lainnya</strong> > <strong>Transfer</strong> > <strong>Ke Rek Bank Lain</strong>.
      </li>
      <li>Masukkan kode bank BRI kemudian diikuti kode pembayaran / virtual account number Anda:
        <strong>
          <CopyButton />
        </strong>.
      </li>
      <li>Ikuti instruksi untuk menyelesaikan transaksi.</li>
      <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
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
