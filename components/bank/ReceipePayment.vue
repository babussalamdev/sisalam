<!-- <template>
  <section>
    <div class="invoice-page mx-auto">
      <div class="container px-5 py-3">
        <div class="d-flex justify-content-center mb-3">
          <img width="150" src="~/assets/image/yayasan.png" alt="">
        </div>
        <div class="card p-5 rounded-4 mb-2 bg-transparent">
          <h2 class="text-dark text-capitalize fw-bold" style="font-size: 40px; font-family: 'Roboto', sans-serif">
            Yayasan Babussalam As-Sunnah</h2>
          <h6 class="mb-0 text-secondary text-uppercase" style="font-size: 32px;">{{
            payment?.receiver_bank_account.bank_code }} {{ payment?.receiver_bank_account.bank_code !== 'qris' ?
              `- ${payment?.receiver_bank_account.account_number}` : '' }}</h6>
        </div>
        <div class="card p-5 rounded-4 mb-2 bg-transparent">
          <h1 class="fw-bolder mb-4" style="font-size: 48px; font-family: 'Roboto', sans-serif;">{{
            nominal(payment?.amount) }}</h1>

          <div class="mb-3">
            <h5>Transaction ID</h5>
            <p>{{ payment?.id }}</p>
          </div>

          <div class="mb-3">
            <h5>Sender Name</h5>
            <p class="mb-0 text-uppercase">{{ payment?.receiver_bank_account.account_holder }}</p>
            <p><span class="text-uppercase">{{ payment?.receiver_bank_account.bank_code }}</span> {{
              payment?.receiver_bank_account.bank_code ? 'Bank Transfer' : 'qris' }}</p>
          </div>

          <div class="mb-3">
            <h5>Payment Time</h5>
            <p>{{ payment?.UpdatedAt }}</p>
          </div>

          <div class="mb-3">
            <h5>Note</h5>
            <p class="text-uppercase">{{ payment?.title }}</p>
          </div>
        </div>
        <div class="card p-5 rounded-4 bg-transparent">
          <h6 class="text-center text-secondary" style="font-size: 24px;">Mohon disimpan sebagai referensi dan
            bukti atas transaksi Anda.
          </h6>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import html2pdf from 'html2pdf.js'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('formulir', ['load', 'payment']),
  },
  async mounted() {
    await this.downloadCertificate();
    await this.setReceipePayment(false)
  },
  methods: {
    ...mapMutations('formulir', ['setReceipePayment']),
    downloadCertificate() {
      const certificateElement = this.$el.querySelector('.invoice-page')

      var opt = {
        filename: `Bukti Pembayaran ${this.payment?.receiver_bank_account.account_holder}`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: [210, 350], orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().from(certificateElement).set(opt).save();
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.invoice-page {
  margin: 0 auto;
  background-color: #fff !important;
  width: 210mm;
  height: 345mm;
  margin: 0;
  background-image: url(~/assets/images/Bg-Receipt.png);
  background-size: cover;
}

.page-break {
  page-break-before: always;
  /* Memulai halaman baru sebelum elemen ini */
}

.bg-color {
  background: #371684;
}

.text-color {
  color: #371684;
}

.text-color-secondary {
  color: #d31a6a;
}

h5 {
  font-weight: 700;
  font-size: 32px;
  color: grey;
  font-family: 'Roboto', sans-serif !important;
  margin-bottom: 2px;
}

p {
  color: #000;
  font-size: 32px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif !important;
}

p span {
  color: #000;
  font-size: 32px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif !important;
}

.certificate-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.invoice {
  font-size: 32px;
  font-weight: 800;
  position: relative;
}

.invoice::before {
  content: "";
  position: absolute;
  width: 200px;
  height: 3px;
  background: rgb(17, 79, 252);
  bottom: -7px;
}

th {
  font-size: 14px;
  font-weight: 900;
  color: #371684;
}

.divide-detail {
  position: relative;
}

.divide-detail::before {
  content: "";
  width: 100%;
  height: 5px;
  position: absolute;
  bottom: -15px;
  background: #1a3cd3;
}

.ttd-img {
  width: 150px;
  position: absolute;
  bottom: 0;
}

footer {
  padding-inline: 8px;
  padding-top: 15px;
  position: relative;
}

footer::before {
  position: absolute;
  top: 0;
  left: -1px;
  content: "";
  width: 100%;
  height: 1px;
  background: #000;
}

footer::after {
  position: absolute;
  top: 3px;
  left: -1px;
  content: "";
  width: 100%;
  height: 1px;
  background: #000;
}

footer p {
  line-height: 32px;
}

.certificate-background {
  width: 100%;
  height: 100%;
  /* background-image: url('~/assets/images/certificate.png'); */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.logo {
  width: 125px;
  height: auto;
}
</style> -->
