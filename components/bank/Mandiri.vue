<template>
  <div class="payment-instruction-wrapper mt-3">
    <div class="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden">
      <div class="p-4 text-center border-bottom">
        <img src="~/assets/image/bank/mandiri.png" alt="Mandiri" class="mb-3" style="height: 35px; object-fit: contain" />
        <p class="text-muted mb-1 small text-uppercase fw-bold ls-1">Total Pembayaran</p>
        <h3 class="text-primary-theme fw-bolder mb-0">Rp {{ nominal(payment.amount) }}</h3>
      </div>

      <div class="p-3 bg-light d-flex flex-column align-items-center justify-content-center text-center">
        <p class="text-muted mb-2 small text-uppercase fw-bold ls-1">Nomor Virtual Account</p>
        <CopyButton :type="type" />
      </div>
    </div>

    <div class="custom-tabs-wrapper bg-light p-1 rounded-pill mb-4 shadow-sm mx-auto" style="max-width: 400px">
      <ul class="nav nav-pills nav-fill m-0">
        <li class="nav-item">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'Livin’' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('Livin’')">
            Livin’
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link rounded-pill fw-bold"
            :class="type === 'atm' ? 'active shadow-sm' : 'text-muted'"
            href="javascript:;"
            @click="setType('atm')">
            ATM
          </a>
        </li>
        <li class="nav-item">
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

    <div class="instructions-container px-2">
      <h6 class="fw-bold text-dark mb-3">Cara Pembayaran</h6>

      <ol v-if="type === 'Livin’'" class="custom-list">
        <li>
          Login ke aplikasi
          <strong>Livin' by Mandiri</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“Bayar”</strong>
          .
        </li>
        <li>
          Ketik
          <strong>“DOKU VA Aggregator”</strong>
          atau
          <strong>“88899”</strong>
          pada bagian pencarian.
        </li>
        <li>
          Masukkan Nomor Virtual Account
          <CopyButton :type="type" />
          secara keseluruhan, lalu masukkan nominal pembayaran, kemudian tekan
          <strong>Lanjutkan</strong>
          .
        </li>
        <li>Pastikan detail pembayaran sudah sesuai (No VA, Jumlah Pembayaran, dan nama Institusi).</li>
        <li>Pilih Rekening Sumber Anda.</li>
        <li>
          Pilih
          <strong>Lanjut Bayar</strong>
          kemudian masukkan PIN Anda untuk konfirmasi.
        </li>
        <li>Transaksi selesai. Simpan resi sebagai bukti transaksi.</li>
      </ol>

      <ol v-if="type === 'atm'" class="custom-list">
        <li>Masukkan Kartu ATM Mandiri, lalu pilih Bahasa.</li>
        <li>Masukkan PIN ATM Anda.</li>
        <li>
          Pilih menu
          <strong>“Bayar/Beli”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“Lainnya”</strong>
          , kemudian tekan kembali
          <strong>“Lainnya”</strong>
          .
        </li>
        <li>
          Pilih menu
          <strong>“Multipayment”</strong>
          .
        </li>
        <li>
          Masukkan Kode Perusahaan / Institusi
          <strong>“88899”</strong>
          , kemudian tekan
          <strong>BENAR</strong>
          .
        </li>
        <li>
          Masukkan Nomor Virtual Account
          <CopyButton :type="type" />
          secara keseluruhan, lalu masukkan nominal, kemudian tekan
          <strong>Lanjutkan</strong>
          .
        </li>
        <li>Pastikan detail pembayaran sudah sesuai.</li>
        <li>
          Konfirmasi pembayaran dengan menekan tombol
          <strong>“YA”</strong>
          .
        </li>
        <li>Transaksi selesai. Simpan struk ATM sebagai bukti bayar.</li>
      </ol>

      <ol v-if="type === 'other'" class="custom-list">
        <li>Masukkan Kartu ATM dan PIN Anda.</li>
        <li>
          Pilih menu
          <strong>“Transfer”</strong>
          .
        </li>
        <li>
          Pilih
          <strong>“Ke Rek Bank Lain”</strong>
          .
        </li>
        <li>
          Masukkan Kode Bank Mandiri
          <strong>“008”</strong>
          dan Nomor Virtual Account
          <CopyButton :type="type" />
          sebagai rekening tujuan, lalu tekan
          <strong>Benar</strong>
          .
        </li>
        <li>
          Masukkan jumlah tagihan pembayaran dan pilih
          <strong>Benar</strong>
          .
        </li>
        <li>
          Layar konfirmasi akan muncul. Pastikan Nomor Rekening Tujuan, Nama, dan Jumlah Bayar sudah benar. Jika sesuai, tekan
          <strong>Benar</strong>
          .
        </li>
        <li>Transaksi selesai.</li>
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
        type: "Livin’",
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

  /* Custom Segmented Tabs */
  .custom-tabs-wrapper .nav-link {
    transition: all 0.3s ease;
    font-size: 14px;
    padding: 8px 16px;
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
    color: #475569; /* Slate grey for readability */
  }

  .custom-list li::before {
    content: counter(step-counter);
    counter-increment: step-counter;
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    background-color: #e0e7ff; /* Light blue background */
    color: #4b55a2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }

  .custom-list strong {
    color: #1e293b; /* Darker tone for emphasis */
  }
</style>
