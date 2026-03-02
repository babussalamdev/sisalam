<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden mx-auto" style="max-width: 500px">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/bsm.png" alt="BSI/BSM" class="mb-3" style="height: 30px; object-fit: contain" />
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
            :class="type === 'mobile' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('mobile')">
            BSI Mobile
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'net' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('net')">
            BSI Net
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'atm' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('atm')">
            ATM BSI
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'ebanking' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('ebanking')">
            E-Banking Lain
          </a>
        </li>
        <li class="nav-item flex-shrink-0">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'other' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('other')">
            ATM Bank Lain
          </a>
        </li>
      </ul>
    </div>

    <div class="instructions-container px-2 mx-auto" style="max-width: 600px">
      <h6 class="fw-bold text-dark mb-3">Cara Pembayaran</h6>

      <ol v-if="type === 'mobile'" class="custom-list">
        <li>
          Buka aplikasi
          <strong>BSI Mobile</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>Pembayaran</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>E-Commerce</strong>
          .
        </li>
        <li>
          Pilih merchant
          <strong>“DOKU”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>Nomor Rekening</strong>
          Anda.
        </li>
        <li>
          Masukkan Nomor Pembayaran:
          <CopyButton :type="type" />
          .
          <br />
          <small class="text-muted">(Catatan: Nomor Bayar adalah Nomor VA tanpa 4 digit pertama)</small>
        </li>
        <li>
          Masukkan
          <strong>PIN BSI Mobile</strong>
          Anda.
        </li>
        <li>Transaksi selesai. Simpan bukti pembayaran.</li>
      </ol>

      <ol v-if="type === 'net'" class="custom-list">
        <li>
          Buka
          <strong>BSI Net</strong>
          (Banking Syariah Indonesia Net).
        </li>
        <li>
          Pilih menu
          <strong>“Pembayaran”</strong>
          .
        </li>
        <li>
          Pilih Jenis Pembayaran
          <strong>“Institusi”</strong>
          .
        </li>
        <li>
          Pilih merchant
          <strong>“DOKU”</strong>
          .
        </li>
        <li>
          Masukkan Nomor Pembayaran:
          <CopyButton :type="type" />
          .
        </li>
        <li>
          Klik tombol
          <strong>“Verifikasi Aplikasi Pembayaran”</strong>
          .
        </li>
        <li>Masukkan PIN dan Token BSI Net Anda.</li>
        <li>
          Klik tombol
          <strong>“Submit”</strong>
          .
        </li>
        <li>Transaksi selesai.</li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>
          Masukkan Kartu ATM dan pilih
          <strong>Bahasa</strong>
          .
        </li>
        <li>
          Masukkan
          <strong>PIN ATM</strong>
          Anda.
        </li>
        <li>
          Pilih
          <strong>“MENU UTAMA”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“PEMBAYARAN/PEMBELIAN”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“AKADEMIK/INSTITUSI”</strong>
          .
        </li>
        <li>
          Masukkan Nomor Virtual Account Anda:
          <CopyButton :type="type" />
          kemudian klik
          <strong>“BENAR”</strong>
          .
        </li>
        <li>
          Klik
          <strong>“BENAR”</strong>
          pada layar konfirmasi pembayaran.
        </li>
        <li>Transaksi selesai. Harap simpan struk Anda.</li>
      </ol>

      <ol v-if="type === 'ebanking'" class="custom-list">
        <li>
          Buka menu
          <strong>Transfer ke Rekening Bank Lain</strong>
          di aplikasi m-banking / e-banking Anda.
        </li>
        <li>
          Pilih bank tujuan
          <strong>“Bank Syariah Indonesia (BSI)”</strong>
          atau masukkan kode bank
          <strong>“451”</strong>
          .
        </li>
        <li>
          Masukkan Nomor Pembayaran sebagai rekening tujuan:
          <CopyButton :type="type" />
          kemudian tekan
          <strong>“Benar”</strong>
          .
        </li>
        <li>
          Masukkan Jumlah Pembayaran.
          <br />
          <small class="text-danger fw-bold">Pastikan jumlah sesuai invoice. Pembayaran akan gagal jika nominal berbeda.</small>
        </li>
        <li>
          Pada Layar Konfirmasi, pastikan Nomor Rekening Tujuan, Nama, dan Nominal sudah benar. Jika sesuai, tekan
          <strong>“Benar”</strong>
          .
        </li>
        <li>Transaksi selesai.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>Masukkan Kartu ATM dan PIN Anda.</li>
        <li>
          Buka menu
          <strong>Transfer Antar Bank</strong>
          .
        </li>
        <li>
          Masukkan kode dan nomor pembayaran sebagai rekening tujuan:
          <CopyButton :type="type" />
          kemudian tekan
          <strong>“Benar”</strong>
          .
        </li>
        <li>
          Masukkan Jumlah Pembayaran.
          <br />
          <small class="text-danger fw-bold">Pastikan jumlah sesuai invoice. Pembayaran akan gagal jika nominal berbeda.</small>
        </li>
        <li>
          Pada Layar Konfirmasi, pastikan Nomor Rekening Tujuan, Nama, dan Nominal sudah benar. Jika sesuai, tekan
          <strong>“Benar”</strong>
          .
        </li>
        <li>Transaksi selesai. Harap simpan struk Anda.</li>
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
        type: "mobile",
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
