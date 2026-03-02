<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden mx-auto" style="max-width: 500px">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/permata.png" alt="Permata" class="mb-3" style="height: 30px; object-fit: contain" />
        <p class="text-muted mb-1 small text-uppercase fw-bold ls-1">Total Pembayaran</p>
        <h3 class="text-primary-theme fw-bolder mb-0">Rp {{ nominal(payment.amount) }}</h3>
      </div>

      <div class="p-3 bg-light d-flex flex-column align-items-center justify-content-center text-center">
        <p class="text-muted mb-2 small text-uppercase fw-bold ls-1">Nomor Virtual Account</p>
        <CopyButton :type="type" />
      </div>
    </div>

    <div class="custom-tabs-wrapper bg-light p-1 rounded-pill mb-4 shadow-sm mx-auto overflow-hidden" style="max-width: 650px">
      <ul class="nav nav-pills flex-nowrap overflow-x-auto hide-scrollbar m-0 pb-1">
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'm-banking' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('m-banking')">
            PermataNet
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'apk' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('apk')">
            PermataMobile X
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'atm' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('atm')">
            ATM Permata
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'other' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('other')">
            ATM Prima/Alto
          </a>
        </li>
      </ul>
    </div>

    <div class="instructions-container px-2 mx-auto" style="max-width: 600px">
      <h6 class="fw-bold text-dark mb-3">Cara Pembayaran</h6>

      <ol v-if="type === 'm-banking'" class="custom-list">
        <li>
          Login ke akun internet banking
          <strong>PermataNet</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“Pembayaran”</strong>
          lalu pilih
          <strong>"Pembayaran Lainnya"</strong>
          .
        </li>
        <li>
          Masukkan Kode Bank Permata
          <strong>(013)</strong>
          sebagai bank tujuan.
        </li>
        <li>
          Masukkan
          <strong>nominal transaksi</strong>
          sesuai tagihan.
        </li>
        <li>
          Masukkan 16 digit Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Konfirmasi Kode Bank, Nomor Virtual Account, dan Nominal Pembayaran. Jika sudah sesuai, pilih
          <strong>“Benar”</strong>
          .
        </li>
        <li>Transaksi selesai.</li>
      </ol>

      <ol v-if="type === 'apk'" class="custom-list">
        <li>
          Buka aplikasi
          <strong>PermataMobile X</strong>
          .
        </li>
        <li>
          Masukkan
          <strong>User ID</strong>
          &
          <strong>Password</strong>
          Anda.
        </li>
        <li>
          Pilih menu
          <strong>“Pembayaran Tagihan”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“Virtual Account”</strong>
          .
        </li>
        <li>
          Masukkan 16 digit Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>Pada layar akan muncul halaman tujuan pembayaran.</li>
        <li>
          Masukkan
          <strong>nominal pembayaran</strong>
          sesuai tagihan.
        </li>
        <li>Pada halaman konfirmasi pembayaran, pastikan data sudah benar.</li>
        <li>
          Masukkan
          <strong>Kode Otentikasi Transaksi / PIN</strong>
          .
        </li>
        <li>Transaksi selesai.</li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>
          Masukkan Kartu ATM dan
          <strong>PIN ATM</strong>
          Permata Anda.
        </li>
        <li>
          Pilih menu
          <strong>“Transaksi Lainnya”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Pembayaran”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Pembayaran Lainnya”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Virtual Account”</strong>
          .
        </li>
        <li>
          Masukkan 16 digit Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Pada layar konfirmasi, pastikan Nomor Rekening dan Jumlah Pembayaran sudah benar. Jika sesuai, pilih
          <strong>“Benar”</strong>
          .
        </li>
        <li>Transaksi selesai. Harap simpan struk pembayaran Anda.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>
          Masukkan Kartu ATM dan
          <strong>PIN ATM</strong>
          Anda pada mesin ATM jaringan Prima/Alto.
        </li>
        <li>
          Pilih
          <strong>“Transfer”</strong>
          . Jika menggunakan ATM bank lain, pilih menu
          <strong>“Transfer ke Bank Lain”</strong>
          .
        </li>
        <li>
          Masukkan Kode Bank Permata
          <strong>(013)</strong>
          diikuti 16 digit Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          kemudian pilih
          <strong>“Benar”</strong>
          .
        </li>
        <li>
          Masukkan
          <strong>nominal pembayaran</strong>
          sesuai tagihan.
          <br />
          <small class="text-danger fw-bold">Transaksi akan gagal jika nominal yang dimasukkan tidak sesuai.</small>
        </li>
        <li>
          Konfirmasi Kode Bank, Nomor Virtual Account, dan Nominal Pembayaran pada layar. Jika sudah sesuai, pilih
          <strong>“Benar”</strong>
          .
        </li>
        <li>Transaksi selesai. Harap simpan struk pembayaran Anda.</li>
      </ol>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import formatSet from "~/mixins/formatSet";

  export default {
    mixins: [formatSet],
    computed: {
      ...mapState("topup", ["payment"]),
    },
    data() {
      return {
        type: "m-banking", // Default tab
      };
    },
    methods: {
      setType(value) {
        this.type = value;
      },
    },
  };
</script>

<style scoped>
  /* Typography utilities */
  .ls-1 {
    letter-spacing: 1px;
  }

  .text-primary-theme {
    color: #4b55a2;
  }

  /* Custom Segmented Tabs with Horizontal Scroll */
  .custom-tabs-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .custom-tabs-wrapper .nav-link {
    transition: all 0.3s ease;
    font-size: 13px;
    padding: 8px 16px;
    white-space: nowrap;
  }

  .custom-tabs-wrapper .nav-link.active {
    background-color: #ffffff;
    color: #4b55a2 !important;
  }

  .custom-tabs-wrapper .nav-link:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.5);
    color: #333 !important;
  }

  /* Custom Numbered List for Instructions */
  .custom-list {
    list-style: none;
    counter-reset: step-counter;
    padding-left: 0;
    margin-bottom: 2rem;
  }

  .custom-list li {
    position: relative;
    padding-left: 40px;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
  }

  .custom-list li::before {
    content: counter(step-counter);
    counter-increment: step-counter;
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    background-color: #e0e7ff;
    color: #4b55a2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }

  .custom-list strong {
    color: #1e293b;
  }
</style>
