<template>
  <div class="d-flex justify-content-evenly shadow py-3 rounded-4">
    <div class="d-flex gap-2">
      <div class="userprofile bg-success d-flex align-items-center justify-content-center mb-2 mt-1 mx-auto">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('index', ['card', 'cardLog']),
    invoice() {
      let inv = 0;
      if (this.cardLog && Array.isArray(this.cardLog)) {
        this.cardLog.forEach((item) => {
          // Memeriksa kondisi dan menambahkan nilai sesuai ke kategori yang benar
          if (item.SK && item.SK.split('#')[0] === 'inv' && item.Amount) {
            inv += parseInt(item.Amount);
          }
        });
      }


      return inv;
    },
    topup() {
      let top = 0;
      if (this.cardLog && Array.isArray(this.cardLog)) {
        this.cardLog.forEach((item) => {
          // Memeriksa kondisi dan menambahkan nilai sesuai ke kategori yang benar
          if (item.SK && item.SK.split('#')[0] === 'vcr' && item.Amount) {
            top += parseInt(item.Amount);
          }
        });
      }

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
