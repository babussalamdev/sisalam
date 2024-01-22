<template>
  <div class="positon-relative">
    <div class="card border-none rounded-4 p-4 mt-4">
      <div class="d-flex justify-content-between">
        <i class="bi bi-credit-card-2-back-fill h2 text-white"></i>
        <img
          src="~/assets/image/logo.png"
          width="30px"
          height="30px"
          class="img-card"
        />
      </div>
      <div class="mb-4">
        <h2 class="fw-semibold text-white">CNC-8635258717</h2>
      </div>
      <div>
        <p class="text-white">001.0920.009</p>
        <h6 class="text-white">Muhammad Fauzan Gunawan</h6>
      </div>
    </div>
    <div class="fake-card border-none rounded-4 bg-warning"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  background-image: url(~/assets/image/card.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.fake-card {
  margin: -39px auto 0;
  height: 50px;
  width: 90%;
  z-index: -2;
}
h2 {
  font-size: 24px;
}
p {
  font-size: 12px;
}
h6 {
  margin-top: -7px;
  font-size: 14px;
}
</style>
