<template>
  <div class="p-2">
    <div class="d-flex justify-content-center align-items-center g-4 mb-3">
      <img src="~/assets/image/bank/permata.png" alt="permata" style="width: 175px;">
    </div>
    <p class="text-secondary mb-1 text-center">Jumlah yang harus dibayar</p>
    <h5 class="text-center mb-4 fw-bold">Rp {{ nominal(payment.amount) }},-</h5>
    <ul class="d-flex justify-content-center align-items-center g-3 nav nav-pills my-4">
      <li class="nav-item">
        <a class="nav-link" :class="type === 'm-banking' ? 'active' : ''" href="javascript:;"
          @click="setType('m-banking')">PermataNet</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'apk' ? 'active' : ''" href="javascript:;" @click="setType('apk')">Mobile X
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'atm' ? 'active' : ''" href="javascript:;" @click="setType('atm')">ATM</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="type === 'other' ? 'active' : ''" href="javascript:;"
          @click="setType('other')">ATM PRIMA/ALTO</a>
      </li>
    </ul>

    <ol v-if="type === 'm-banking'">
      <li>Login ke akun internet banking.</li>
      <li>Pilih menu “pembayaran” dan pilih "Pembayaran Lainnya".</li>
      <li>Masukkan kode bank Permata (013) sebagai bank tujuan.</li>
      <li>Masukkan nominal transaksi.</li>
      <li>Masukkan 16 digit nomor virtual account <CopyButton />.</li>
      <li>Konfirmasi kode bank, nomor virtual account, dan nominal pembayaran. Jika sudah sesuai, pilih “Benar”.</li>
      <li>Selesai.</li>
    </ol>

    <ol v-if="type === 'apk'">
      <li>Buka aplikasi PermataMobileX.</li>
      <li>Masukkan User ID & Password.</li>
      <li>Pilih “Pembayaran Tagihan”.</li>
      <li>Pilih “Virtual Account” (Akun Virtual).</li>
      <li>Masukkan 16 digit Virtual Account yang tertera pada halaman konfirmasi (<CopyButton />).</li>
      <li>Muncul halaman tujuan pembayaran.</li>
      <li>Masukkan nominal pembayaran sesuai dengan yang ditagihkan.</li>
      <li>Muncul konfirmasi pembayaran.</li>
      <li>Masukkan Kode Otentikasi Transaksi.</li>
      <li>Transaksi selesai.</li>
    </ol>

    <ol v-if="type === 'atm'">
      <li>Masukkan PIN.</li>
      <li>Pilih menu “Transaksi Lainnya”.</li>
      <li>Pilih “Pembayaran”.</li>
      <li>Pilih “Pembayaran Lainnya”.</li>
      <li>Pilih “Virtual Account”.</li>
      <li>Masukkan Nomor Virtual Account <CopyButton />.</li>
      <li>Jumlah yang harus dibayar dan nomor rekening akan muncul pada halaman konfirmasi pembayaran. Jika informasi
        sudah benar, pilih “Benar”.</li>
    </ol>

    <ol v-if="type === 'other'">
      <li>Masukkan PIN.</li>
      <li>Pilih “Transfer”. Jika menggunakan ATM bank lain, pilih “Pembayaran Lainnya”.</li>
      <li>Pilih “Pembayaran Lainnya”.</li>
      <li>Masukkan kode bank Permata (013) diikuti 16 digit nomor virtual account anda: <CopyButton /> kemudian pilih “Benar”.</li>
      <li>Masukkan nominal yang akan dibayarkan. Pembayaran transaksi gagal akan muncul jika nominal yang dimasukkan
        salah.</li>
      <li>Konfirmasi kode bank, nomor virtual account, dan nominal pembayaran. Jika sudah sesuai, pilih “Benar”.</li>
      <li>Transaksi Anda selesai.</li>
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
