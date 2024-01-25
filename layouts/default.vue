<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadCard");
  },
  async middleware({ redirect }) {
    const card = localStorage.getItem("card");
    if (!card) {
      redirect("/");
    }
  },
};
</script>

<style scoped></style>
