<template>
  <div class="menu d-flex justify-content-evenly mt-4">
    <!-- menu -->
    <nuxt-link to="/topup" class="text-decoration-none">
      <div class="d-flex flex-column text-center bg-primaryr">
        <div
          class="userprofile d-flex align-items-center justify-content-center mb-2 mx-auto"
        >
          <i class="bi bi-wallet-fill h4 pt-1 text-white fw-bold"></i>
        </div>
        <div>
          <p class="fw-semibold">Top Up</p>
        </div>
      </div>
    </nuxt-link>
    <!-- menu -->
    <nuxt-link to="/profil" class="text-decoration-none">
      <div class="d-flex flex-column text-center bg-primaryr">
        <div
          class="userprofile d-flex align-items-center justify-content-center mb-2 mx-auto"
        >
          <i class="bi bi-person-fill h4 text-white fw-bold"></i>
        </div>
        <div>
          <p class="fw-semibold">Profil</p>
        </div>
      </div>
    </nuxt-link>
    <!-- menu -->
    <nuxt-link to="/history" class="text-decoration-none">
      <div class="d-flex flex-column text-center bg-primaryr">
        <div
          class="userprofile d-flex align-items-center justify-content-center mb-2 mx-auto"
        >
          <i class="bi bi-hourglass-split h4 pt-1 text-white fw-bold"></i>
        </div>
        <div>
          <p class="fw-semibold">History</p>
        </div>
      </div>
    </nuxt-link>
    <!-- menu -->
    <nuxt-link to="/menu" class="text-decoration-none">
      <div class="d-flex flex-column text-center bg-primaryr">
        <div
          class="userprofile d-flex align-items-center justify-content-center mb-2 mx-auto"
        >
          <i class="bi bi-menu-button-fill h4 pt-1 text-white fw-bold"></i>
        </div>
        <div>
          <p class="fw-semibold">Menu</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.userprofile {
  width: 48px;
  height: 48px;
  background-color: #44b5ff;
  border-radius: 30px;
  padding-top: 5px;
}
p {
  margin-bottom: 0 !important;
  font-size: 12px;
  color: #44b5ff;
}
</style>
