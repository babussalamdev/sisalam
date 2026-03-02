<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden mx-auto" style="max-width: 500px">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/bni.png" alt="BNI" class="mb-3" style="height: 30px; object-fit: contain" />
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
            Teller
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
          Buka aplikasi
          <strong>BNI Mobile</strong>
          .
        </li>
        <li>Login ke akun BNI Mobile Banking Anda.</li>
        <li>
          Pilih menu
          <strong>pembayaran</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Transfer”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>E-Commerce</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Virtual Account Billing”</strong>
          , lalu pilih rekening debit Anda.
        </li>
        <li>
          Pilih merchant
          <strong>Foolmoon</strong>
          .
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda di
          <strong>“Input Baru”</strong>
          .
        </li>
        <li>
          Masukkan nomor pembayaran
          <CopyButton :type="type" />
          .
        </li>
        <li>Konfirmasi bahwa jumlah pembayaran ditampilkan di layar.</li>
        <li>Masukkan PIN.</li>
        <li>Konfirmasi transaksi dan masukkan kata sandi transaksi Anda.</li>
        <li>Konfirmasi transaksi.</li>
        <li>Transaksi berhasil.</li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>Masukkan kartu ATM BNI, lalu masukkan PIN ATM.</li>
        <li>
          Pilih menu
          <strong>“Menu Lain”</strong>
          , lalu pilih menu
          <strong>“Transfer”</strong>
          .
        </li>
        <li>Pilih Jenis Akun.</li>
        <li>
          Pilih
          <strong>“Ke Rekening BNI”</strong>
          .
        </li>
        <li>
          Masukkan nomor rekening dengan Kode Pembayaran
          <CopyButton :type="type" />
          dan pilih
          <strong>“Benar”</strong>
          .
        </li>
        <li>
          Saat Konfirmasi Pembayaran muncul, pilih
          <strong>“Ya”</strong>
          .
        </li>
        <li>Transaksi sudah selesai, mohon simpan struknya.</li>
      </ol>

      <ol v-if="type === 'i-banking'" class="custom-list">
        <li>
          Login Internet Banking, lalu pilih menu
          <strong>“Transfer”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“In-House”</strong>
          .
        </li>
        <li>
          Masukkan nomor rekening dengan Kode Pembayaran Anda
          <CopyButton :type="type" />
          lalu pilih
          <strong>“Kirim”</strong>
          .
        </li>
        <li>Masukkan “Kata Sandi” dan OTP Anda.</li>
        <li>Transaksi sudah selesai, mohon simpan struknya.</li>
      </ol>

      <ol v-if="type === 'teller'" class="custom-list">
        <li>Kunjungi Teller Bank BNI di Kantor BNI.</li>
        <li>Isi Formulir Setoran Tunai.</li>
        <li>
          Pilih
          <strong>“Tunai”</strong>
          . Masukkan Kode Pembayaran
          <CopyButton :type="type" />
          dan jumlah pembayaran. Tulis nama dan tanda tangan Anda.
        </li>
        <li>Kirim Formulir Setoran Tunai dan uang tunai ke Teller BNI.</li>
        <li>Transaksi selesai, mohon simpan salinan Formulir Setoran Tunai sebagai tanda terima pembayaran.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>Masukkan kartu ATM, lalu masukkan PIN ATM.</li>
        <li>
          Pilih menu
          <strong>“Transfer Antar Bank”</strong>
          .
        </li>
        <li>
          Masukkan “Kode Bank Tujuan”: BNI
          <strong>(Kode Bank: 009)</strong>
          + Kode Pembayaran
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Masukkan
          <strong>jumlah tagihan</strong>
          pembayaran.
        </li>
        <li>
          Saat Konfirmasi Transfer muncul, pilih
          <strong>“Ya” / “Lanjut”</strong>
          .
        </li>
        <li>Transaksi sudah selesai, silahkan ambil struknya.</li>
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
    /* Allows tabs to slide horizontally on small devices */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }
  .hide-scrollbar {
    -ms-overflow-style: none; /* IE/Edge */
    scrollbar-width: none; /* Firefox */
  }

  .custom-tabs-wrapper .nav-link {
    transition: all 0.3s ease;
    font-size: 13px;
    padding: 8px 16px;
    white-space: nowrap; /* Prevents text from wrapping to two lines */
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
