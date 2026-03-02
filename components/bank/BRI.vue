<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden mx-auto" style="max-width: 500px">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/bri.png" alt="BRI" class="mb-3" style="height: 30px; object-fit: contain" />
        <p class="text-muted mb-1 small text-uppercase fw-bold ls-1">Total Pembayaran</p>
        <h3 class="text-primary-theme fw-bolder mb-0">Rp {{ nominal(payment.amount) }}</h3>
      </div>

      <div class="p-3 bg-light d-flex flex-column align-items-center justify-content-center text-center">
        <p class="text-muted mb-2 small text-uppercase fw-bold ls-1">Nomor BRIVA</p>
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
            Mobile Banking
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'atm' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('atm')">
            ATM
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'i-banking' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('i-banking')">
            Internet Banking
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'teller' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('teller')">
            EDC BRI
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'other' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('other')">
            Bank Lain
          </a>
        </li>
      </ul>
    </div>

    <div class="instructions-container px-2 mx-auto" style="max-width: 600px">
      <h6 class="fw-bold text-dark mb-3">Cara Pembayaran</h6>

      <ol v-if="type === 'm-banking'" class="custom-list">
        <li>
          Login ke aplikasi
          <strong>BRImo (BRI Mobile)</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>BRIVA</strong>
          .
        </li>
        <li>
          Pilih
          <strong>Pembayaran Baru</strong>
          .
        </li>
        <li>
          Masukkan Nomor BRIVA (Virtual Account):
          <CopyButton :type="type" />
          .
        </li>
        <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Total Pembayaran.</li>
        <li>Masukkan PIN Anda.</li>
        <li>Simpan notifikasi / screenshot layar sebagai bukti pembayaran.</li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>Masukkan Kartu Debit BRI dan PIN Anda.</li>
        <li>
          Pilih menu
          <strong>Transaksi Lain</strong>
          >
          <strong>Pembayaran</strong>
          >
          <strong>Lainnya</strong>
          >
          <strong>BRIVA</strong>
          .
        </li>
        <li>
          Masukkan Nomor BRIVA (Virtual Account):
          <CopyButton :type="type" />
          .
        </li>
        <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah Pembayaran.</li>
        <li>Ikuti instruksi di layar untuk menyelesaikan transaksi.</li>
        <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
      </ol>

      <ol v-if="type === 'i-banking'" class="custom-list">
        <li>
          Login pada alamat
          <a href="https://ib.bri.co.id/ib-bri/Login.html" target="_blank" class="text-decoration-none fw-bold">Internet Banking BRI</a>
          .
        </li>
        <li>
          Pilih menu
          <strong>Pembayaran Tagihan</strong>
          >
          <strong>Pembayaran</strong>
          >
          <strong>BRIVA</strong>
          .
        </li>
        <li>
          Masukkan Nomor BRIVA (Virtual Account):
          <CopyButton :type="type" />
          .
        </li>
        <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah Pembayaran.</li>
        <li>Masukkan password dan mToken Anda.</li>
        <li>Cetak atau simpan struk pembayaran digital sebagai bukti pembayaran.</li>
      </ol>

      <ol v-if="type === 'teller'" class="custom-list">
        <li>
          Pada mesin EDC, pilih menu
          <strong>Mini ATM</strong>
          >
          <strong>Pembayaran</strong>
          >
          <strong>BRIVA</strong>
          .
        </li>
        <li>Swipe Kartu Debit BRI Anda.</li>
        <li>
          Masukkan Nomor BRIVA (Virtual Account):
          <CopyButton :type="type" />
          .
        </li>
        <li>Masukkan PIN Anda.</li>
        <li>Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan, dan Jumlah Pembayaran.</li>
        <li>Simpan struk transaksi yang keluar dari mesin sebagai bukti pembayaran.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>Masukkan Kartu Debit dan PIN Anda.</li>
        <li>
          Pilih menu
          <strong>Transaksi Lainnya</strong>
          >
          <strong>Transfer</strong>
          >
          <strong>Ke Rek Bank Lain</strong>
          .
        </li>
        <li>
          Masukkan kode bank BRI
          <strong>(002)</strong>
          diikuti Nomor BRIVA (Virtual Account):
          <CopyButton :type="type" />
          .
        </li>
        <li>Masukkan jumlah pembayaran sesuai tagihan.</li>
        <li>Ikuti instruksi di layar untuk menyelesaikan transaksi.</li>
        <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
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
        type: "m-banking",
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
