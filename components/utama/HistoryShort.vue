<template>
  <div>
    <div
      class="card rounded-4 shadow bg-white border-0 px-3 px-md-5 py-4 py-md-4 mx-3 mx-md-0"
    >
      <!-- list -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon-history bg-danger rounded-3 d-flex justify-content-center pt-2"
          >
            <i class="bi bi-shop h2 text-white fw-bold"></i>
          </div>
          <div class="">
            <h5>Invoice Transaksi</h5>
            <p class="date-history">January 19, 2024</p>
          </div>
        </div>
        <div>
          <h5 class="text-danger fw-semibold price">-10.000 IDR</h5>
        </div>
      </div>
      <hr />
      <!-- list -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon-history bg-success rounded-3 d-flex justify-content-center pt-2"
          >
            <i class="bi bi-coin h2 text-white fw-bold"></i>
          </div>
          <div class="">
            <h5>Top Up Berhasil</h5>
            <p class="date-history">January 19, 2024</p>
          </div>
        </div>
        <div>
          <h5 class="text-success fw-semibold price">+20.000 IDR</h5>
        </div>
      </div>
      <hr />
      <!-- list -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon-history bg-danger rounded-3 d-flex justify-content-center pt-2"
          >
            <i class="bi bi-shop h2 text-white fw-bold"></i>
          </div>
          <div class="">
            <h5>Invoice Transaksi</h5>
            <p class="date-history">January 19, 2024</p>
          </div>
        </div>
        <div>
          <h5 class="text-danger fw-semibold price">-15.000 IDR</h5>
        </div>
      </div>
      <hr />
      <!-- list -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon-history bg-danger rounded-3 d-flex justify-content-center pt-2"
          >
            <i class="bi bi-shop h2 text-white fw-bold"></i>
          </div>
          <div class="">
            <h5>Invoice Transaksi</h5>
            <p class="date-history">January 19, 2024</p>
          </div>
        </div>
        <div>
          <h5 class="text-danger fw-semibold price">-10.000 IDR</h5>
        </div>
      </div>
      <hr />

      <!-- list -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div
            class="icon-history bg-success rounded-3 d-flex justify-content-center pt-2"
          >
            <i class="bi bi-coin h2 text-white fw-bold"></i>
          </div>
          <div class="">
            <h5>Top Up Berhasil</h5>
            <p class="date-history">January 19, 2024</p>
          </div>
        </div>
        <div class="d-flex align-items-center align-content-center">
          <h5 class="text-success fw-semibold price">+50.000 IDR</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.icon-history {
  width: 50px;
  height: 50px;
}
.date-history {
  margin: -5px 0 !important;
  font-size: 12px;
}

@media screen and (max-width: 576px) {
  .icon-history {
    width: 30px;
    height: 30px;
  }
  i {
    font-size: 14px;
  }
  h5 {
    font-size: 14px;
    margin-top: -9px;
  }
  .price {
    margin-top: 5px;
  }
  .date-history {
    margin: -7px 0 !important;
    font-size: 8px;
  }
}
</style>
