<template>
  <div class="history mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5>Last Transaction</h5>
      <nuxt-link to="/history" class="text-decoration-none" :class="$auth.user.cnc !== '-' ? '' : 'greyscale'">
        <p class="fw-thin">See all</p>
      </nuxt-link>
    </div>
    <HistoryList />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.greyscale {
  filter: grayscale(100%);
  pointer-events: none;
}
h5 {
  font-size: 18px;
  margin-bottom: 0 !important;
}
p {
  font-size: 14px;
  margin-bottom: 0 !important;
}
</style>
