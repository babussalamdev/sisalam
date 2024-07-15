<template>
  <section id="history">
    <div class="media mx-auto">
      <div class="container">
        <div class="row">
          <div class="col-12 col-xl-5">
            <!-- Judul -->
            <div class="d-flex justify-content-between">
              <nuxt-link to="/card">
                <img src="~/assets/image/icon/Left.png" alt="" />
              </nuxt-link>
              <h4>History</h4>
              <img class="fake-image" src="~/assets/image/icon/Left.png" alt="" />
            </div>

            <!-- Info balance -->
            <div class="info-balance text-center mt-5">
              <h6 class="fw-light">Your Balance</h6>
              <h1 class="fw-semibold">
                Rp {{ nominal(card.Balance) }}
              </h1>
              <p class="fw-light">{{ card.SK }}</p>
            </div>

            <!-- history -->
            <div class="history mt-4">
              <!-- summary account -->
              <BlokHistory />
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
import { mapState } from 'vuex'
export default {
  middleware({ $auth, redirect }) {
    if ( $auth.user.cnc === '-') {
      return redirect('/card')
    }
  },
  layout: "utama",
  async asyncData({ store }) {
    store.dispatch('index/renderPage')
  },
  computed: {
    ...mapState('index', ['card', 'cardLog']),
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
  /* padding-top: 20px; */
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
