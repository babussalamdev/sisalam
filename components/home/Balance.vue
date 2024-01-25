<template>
  <div class="balance py-3 px-4 rounded-4 mt-3 shadow">
    <div class="d-flex">
      <div
        class="logobalance d-flex align-items-center justify-content-center me-3"
      >
        <i class="bi bi-bar-chart-line-fill text-white h3"></i>
      </div>
      <div>
        <p class="text-white">Total Balance</p>
        <h6 class="text-white fw-semibold">
          Rp {{ nominal($store.state.card.balance) }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.balance {
  background-image: url(~/assets/image/balance.png);
  background-size: cover;
  background-position: top;
}
.logobalance {
  width: 48px;
  height: 48px;
  background-color: skyblue;
  border-radius: 30px;
  padding-top: 5px;
}
p {
  font-size: 12px;
}
h6 {
  margin-top: -12px;
  font-size: 20px;
}
</style>
