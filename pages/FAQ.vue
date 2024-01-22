<template>
  <section id="faq">
    <div class="media mx-auto">
      <div class="container mb-5">
        <!-- Judul -->
        <div class="d-flex justify-content-between">
          <nuxt-link to="/menu">
            <img src="~/assets/image/icon/Left.png" alt="" />
          </nuxt-link>
          <h4>FAQ</h4>
          <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
        </div>
        <div class="accordion mt-4" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Apa itu Card Babussalam?
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Card Babussalam adalah sistem cashless yang memudahkan transaksi
                di kantin Pondok Babussalam. Dengan menggunakan kartu ini,
                pengguna dapat melakukan aktivasi, top up voucher, dan transaksi
                tanpa menggunakan uang tunai.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Bagaimana cara melakukan aktivasi kartu?
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Aktivasi kartu dapat dilakukan melalui web Card Babussalam
                dengan menggunakan fitur yang disediakan.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Bagaimana cara top up voucher ke kartu?
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Pengguna dapat melakukan top up voucher melalui web Card
                Babussalam. Caranya adalah dengan mengakses fitur top up dan
                mengikuti petunjuk yang disediakan.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Bagaimana cara melihat saldo kartu?
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Saldo kartu dapat dilihat melalui web Card Babussalam dengan
                masuk ke akun pengguna.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Apa yang harus dilakukan jika kartu hilang atau dicuri?
              </button>
            </h2>
            <div
              id="collapseFive"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Jika kartu hilang atau dicuri, segera hubungi pihak kantin
                Pondok Babussalam untuk melaporkan kejadian tersebut. Kartu
                dapat dinonaktifkan sementara dan digantikan dengan yang baru.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Apakah Card Babussalam dapat digunakan di semua outlet di Pondok
                Babussalam?
              </button>
            </h2>
            <div
              id="collapseSix"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Kartu dapat digunakan di semua outlet yang telah bekerja sama
                dengan sistem Card Babussalam di Pondok Babussalam.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                Bagaimana cara menghubungi dukungan pelanggan Card Babussalam?
              </button>
            </h2>
            <div
              id="collapseSeven"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Untuk bantuan dan pertanyaan lebih lanjut, Anda dapat
                menghubungi dukungan pelanggan Card Babussalam melalui kontak
                yang tertera di web resmi atau mengunjungi kantin Pondok
                Babussalam.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
#faq {
  padding-top: 20px;
}
.fake-image {
  opacity: 0;
}

.media {
  width: 40%;
}

@media screen and (max-width: 576px) {
  .media {
    width: 100% !important;
  }
}
/* tablet */
@media screen and (max-width: 991px) {
  .media {
    width: 70%;
  }
}
</style>
