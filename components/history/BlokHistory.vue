<template>
  <div class="shadow py-3 rounded-4">
    <div class="text-center">
      <p class="userprofile-p fw-semibold">Saldo</p>
      <h5 class="fw-bold">{{ nominal(topup - invoice) }}</h5>
    </div>
    <div class="d-flex justify-content-evenly">
      <div class="d-flex gap-2">
        <div class="userprofile bg-success d-flex align-items-center justify-content-center mb-2 mt-1 mx-auto">
          <i class="bi bi-arrow-down h6 pt-1 text-white fw-bold"></i>
        </div>
        <div>
          <p class="userprofile-p fw-semibold">Top Up</p>
          <h6 class="text-success">{{ nominal(topup) }}</h6>
        </div>
      </div>
      <div class="d-flex gap-2">
        <div class="userprofile bg-danger d-flex align-items-center justify-content-center mb-2 mt-1 mx-auto">
          <i class="bi bi-arrow-up h6 pt-1 text-white fw-bold"></i>
        </div>
        <div>
          <p class="userprofile-p fw-semibold">Transactions</p>
          <h6 class="text-danger">{{ nominal(invoice) }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('index', ['card', 'cardLog', 'topup', 'invoice']),
  },
  methods: {
    nominal(a) {
      return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(a);
    },
  },
}
</script>

<style scoped>
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
</style>
