<template>
  <div class="list">
    <!-- List -->
    <div v-for="(data, i) in filterData" :key="i" class="d-flex justify-content-between mb-3">
      <div class="d-flex">
        <div :class="`historylist ${data.GSIPK1 !== 'debit' ? 'bg-danger' : 'bg-success'
          } d-flex align-items-center justify-content-center me-3`">
          <i :class="`bi ${data.Location ? 'bi-shop' : 'bi-coin'
            } mt-1 text-white h3`"></i>
        </div>
        <div class="d-flex flex-column justify-content-center">
          <h5>{{ data.GSIPK1 !== 'debit' ? "Invoice Transaksi" : "Top Up" }}</h5>
          <p>{{ formDate(data.SK) }}</p>
          <p>{{ data.SK.split(' ')[1] }}</p>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <h5 :class="` ${data.GSIPK1 !== 'debit' ? 'text-danger' : 'text-success'}`">
          Rp {{ nominal(data.Amount) }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('index', ['cardLog']),
    filterData() {
      const data = this.cardLog;
      const limit = this.$route.path === "/card" ? 5 : data.length;
      return data.slice(0, limit);
    },
  },

  methods: {
    formDate(daTe) {
      const inputDate = daTe;
      const dateObject = new Date(inputDate);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = dateObject.toLocaleDateString("id-ID", options);

      return formattedDate;
    },
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
.historylist {
  width: 48px;
  height: 48px;
  /* background-color: rgb(117, 211, 122); */
  border-radius: 30px;
  padding-top: 5px;
}

h5 {
  margin-bottom: 0 !important;
  font-size: 16px;
}

p {
  margin-bottom: 0 !important;
  font-size: 12px;
}
</style>
