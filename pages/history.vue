<template>
  <section id="history">
    <div class="media mx-auto">
      <div class="container">
        <div class="row">
          <div class="col-12 col-xl-5">
            <!-- Judul -->
            <div class="d-flex justify-content-between">
              <nuxt-link to="/cardInfo">
                <img src="~/assets/image/icon/Left.png" alt="" />
              </nuxt-link>
              <h4>History</h4>
              <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
            </div>

            <!-- Info balance -->
            <div class="info-balance text-center mt-5">
              <h6 class="fw-light">Your Balance</h6>
              <h1 class="fw-semibold">
                Rp {{ nominal($store.state.card.balance) }}
              </h1>
              <p class="fw-light">{{ $store.state.card.number }}</p>
            </div>

            <!-- history -->
            <div class="history mt-4">
              <!-- summary account -->
              <div class="d-flex justify-content-evenly shadow py-3 rounded-4">
                <div class="d-flex gap-2">
                  <div
                    class="userprofile bg-success d-flex align-items-center justify-content-center mb-2 mt-1 mx-auto">
                    <i class="bi bi-arrow-down h6 pt-1 text-white fw-bold"></i>
                  </div>
                  <div>
                    <p class="userprofile-p fw-semibold">Income</p>
                    <h6 class="text-success">{{ nominal(topup) }}</h6>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div class="userprofile bg-danger d-flex align-items-center justify-content-center mb-2 mt-1 mx-auto">
                    <i class="bi bi-arrow-up h6 pt-1 text-white fw-bold"></i>
                  </div>
                  <div>
                    <p class="userprofile-p fw-semibold">Expense</p>
                    <h6 class="text-danger">{{ nominal(invoice) }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-7">
            <div>
              <!-- list history -->
              <div class="d-flex justify-content-between align-items-center my-4">
                <h5>Last Transaction</h5>
              </div>
              <HistoryList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "utama",

  computed: {
    invoice() {
      let inv = 0;

      this.$store.state.history.forEach((item) => {
        // Memeriksa kondisi dan menambahkan nilai sesuai ke kategori yang benar
        if (item.location) {
          inv += parseInt(item.amount);
        }
      });

      return inv;
    },
    topup() {
      let top = 0;

      this.$store.state.history.forEach((item) => {
        // Memeriksa kondisi dan menambahkan nilai sesuai ke kategori yang benar
        if (!item.location) {
          top += parseInt(item.amount);
        }
      });

      return top;
    },
  },

  methods: {
    nominal(a) {
      return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(a);
    },
  },
};
</script>

<style scoped>
#history {
  padding-top: 20px;
  margin-bottom: 100px;
}

.col-xl-7 {
  height: 90vh;
  overflow-y: scroll;
}

/* balance */
.info-balance h6 {
  font-size: 14px;
  opacity: 0.7;
}

.info-balance h1 {
  font-size: 36px;
}

.info-balance p {
  font-size: 14px;
  color: #046edb;
}

/* account summary */
.userprofile {
  width: 36px;
  height: 36px;
  border-radius: 30px;
  padding-top: 5px;
}

.userprofile-p {
  margin-bottom: 0 !important;
  font-size: 12px;
}

/* container */
h5 {
  font-size: 18px;
  margin-bottom: 0 !important;
}

h4 {
  margin-bottom: 0 !important;
}

.fake-image {
  opacity: 0;
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

  .col-xl-7 {
    height: max-content;
    overflow-y: visible;
  }
}
</style>
