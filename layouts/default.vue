<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("profile/initCooldown");
    },
  };
</script>

<style scoped></style>
