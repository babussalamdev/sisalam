<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden mx-auto" style="max-width: 500px">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/cimb.png" alt="CIMB Niaga" class="mb-3" style="height: 30px; object-fit: contain" />
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
            :class="type === 'octo' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('octo')">
            OCTO Mobile
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'octoc' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('octoc')">
            OCTO Clicks
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'atm' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('atm')">
            ATM CIMB
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'i-banking' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('i-banking')">
            I-Banking Lain
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'other' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('other')">
            ATM Jaringan Lain
          </a>
        </li>
      </ul>
    </div>

    <div class="instructions-container px-2 mx-auto" style="max-width: 600px">
      <h6 class="fw-bold text-dark mb-3">Cara Pembayaran</h6>

      <ol v-if="type === 'octo'" class="custom-list">
        <li>
          Login ke aplikasi
          <strong>OCTO Mobile</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>Transfer</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>Transfer to Other CIMB Niaga Account</strong>
          .
        </li>
        <li>
          Pilih
          <strong>Source of Fund</strong>
          (Rekening Sumber Dana).
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Masukkan jumlah pembayaran
          <strong>(Amount)</strong>
          sesuai tagihan.
        </li>
        <li>
          Klik tombol
          <strong>Next</strong>
          .
        </li>
        <li>Pada layar konfirmasi, pastikan Nomor Virtual Account, Nama, dan Jumlah Pembayaran sudah sesuai.</li>
        <li>
          Klik tombol
          <strong>Confirm</strong>
          .
        </li>
        <li>
          Masukkan
          <strong>PIN OCTO Mobile</strong>
          Anda untuk menyelesaikan transaksi.
        </li>
      </ol>

      <ol v-if="type === 'octoc'" class="custom-list">
        <li>
          Login ke
          <a href="https://www.octoclicks.co.id" target="_blank" class="text-decoration-none fw-bold">OCTO Clicks</a>
          .
        </li>
        <li>
          Pilih menu
          <strong>Pembayaran Tagihan</strong>
          .
        </li>
        <li>
          Pilih kategori transaksi:
          <strong>Virtual Account</strong>
          .
        </li>
        <li>Pilih rekening sumber dana.</li>
        <li>
          Masukkan Nomor Virtual Account:
          <CopyButton :type="type" />
          lalu klik tombol
          <strong>Lanjutkan</strong>
          .
        </li>
        <li>Pada layar konfirmasi, pastikan Nomor Virtual Account, Nama, dan Total Tagihan sudah sesuai.</li>
        <li>
          Masukkan
          <strong>6 digit OTP</strong>
          dan tekan tombol
          <strong>Submit</strong>
          .
        </li>
        <li>
          Klik tombol
          <strong>Konfirmasi</strong>
          untuk menyelesaikan transaksi.
        </li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>Masukkan Kartu ATM dan PIN CIMB Niaga Anda.</li>
        <li>
          Pilih menu
          <strong>Pembayaran</strong>
          >
          <strong>Lanjut</strong>
          >
          <strong>Virtual Account</strong>
          .
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>Pilih rekening debit Anda.</li>
        <li>Pada layar konfirmasi, pastikan Nomor Virtual Account, Nama, dan Total Tagihan sudah benar.</li>
        <li>
          Pilih
          <strong>OK</strong>
          untuk melakukan pembayaran.
        </li>
        <li>Transaksi selesai. Harap simpan struk Anda.</li>
      </ol>

      <ol v-if="type === 'i-banking'" class="custom-list">
        <li>Login ke Internet Banking bank Anda.</li>
        <li>
          Pilih menu
          <strong>Transfer ke Bank Lain Online</strong>
          .
        </li>
        <li>
          Pilih bank tujuan
          <strong>Bank CIMB Niaga</strong>
          (Kode Bank:
          <strong>022</strong>
          ).
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Masukkan
          <strong>jumlah pembayaran</strong>
          sesuai tagihan.
          <br />
          <small class="text-danger fw-bold">Pastikan nominal sesuai agar transaksi berhasil.</small>
        </li>
        <li>Pada layar konfirmasi, pastikan data yang ditampilkan sudah benar.</li>
        <li>Ikuti instruksi sistem untuk menyelesaikan transaksi.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>Masukkan Kartu ATM dan PIN Anda pada mesin ATM berlogo Alto/Bersama/Prima.</li>
        <li>
          Pilih menu
          <strong>Transfer</strong>
          >
          <strong>Transfer ke Bank Lain</strong>
          .
        </li>
        <li>
          Masukkan Kode Bank CIMB Niaga:
          <strong>022</strong>
          .
        </li>
        <li>
          Masukkan
          <strong>jumlah pembayaran</strong>
          sesuai tagihan.
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          .
        </li>
        <li>Pada layar konfirmasi, pastikan data yang ditampilkan sudah benar.</li>
        <li>Ikuti instruksi sistem untuk menyelesaikan transaksi dan simpan struk pembayaran.</li>
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
        type: "octo", // Default tab
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
