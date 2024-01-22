<template>
  <div class="position-relative">
    <div
      class="card-user d-flex flex-column gap-2 position-relative p-4 mt-4 text-white rounded-4"
    >
      <div class="d-flex justify-content-between">
        <i class="bi bi-credit-card-2-back-fill h2"></i>
        <img
          src="~/assets/image/logo.png"
          width="50px"
          height="50px"
          class="img-card"
        />
      </div>
      <div>
        <h6>Student Card</h6>
        <h1 class="fw-bold">{{ $parent.cnc.split("-")[1] }}</h1>
      </div>
      <div>
        <h6 class="student">Muhammad Fauzan Gunawan</h6>
        <p>NIS 001.0920.001</p>
      </div>
    </div>
    <div class="card-layer rounded-4 bg-warning mx-auto"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-user {
  background-image: url(~/assets/image/card.png);
  background-repeat: no-repeat;
  background-size: cover;
  border: none !important;
  z-index: 3;
}
.card-layer {
  height: 100px;
  border: none !important;
  width: 90%;
  margin-top: -85px;
}
</style>
